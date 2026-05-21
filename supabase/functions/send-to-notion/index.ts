import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/notion/v1';

interface Payload {
  databaseId: string;
  title: string;
  fields: Record<string, string | number | boolean | undefined | null>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const NOTION_API_KEY = Deno.env.get('NOTION_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');
    if (!NOTION_API_KEY) throw new Error('NOTION_API_KEY not configured');

    const body = (await req.json()) as Payload;
    if (!body?.databaseId || !body?.title) {
      return new Response(
        JSON.stringify({ error: 'databaseId e title são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Discover the Title property name of the target database (varies per DB)
    const dbRes = await fetch(`${GATEWAY_URL}/databases/${body.databaseId}`, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': NOTION_API_KEY,
      },
    });
    const dbData = await dbRes.json();
    if (!dbRes.ok) {
      throw new Error(`Notion DB fetch failed [${dbRes.status}]: ${JSON.stringify(dbData)}`);
    }
    const titlePropName =
      Object.entries(dbData.properties || {}).find(
        ([, v]: [string, any]) => v?.type === 'title',
      )?.[0] ?? 'Name';

    // Build a body block listing all fields
    const lines = Object.entries(body.fields || {})
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}: ${String(v)}`);

    const children = lines.map((line) => ({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ type: 'text', text: { content: line } }],
      },
    }));

    const createRes = await fetch(`${GATEWAY_URL}/pages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': NOTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: body.databaseId },
        properties: {
          [titlePropName]: {
            title: [{ type: 'text', text: { content: body.title } }],
          },
        },
        children,
      }),
    });

    const created = await createRes.json();
    if (!createRes.ok) {
      throw new Error(`Notion create failed [${createRes.status}]: ${JSON.stringify(created)}`);
    }

    return new Response(JSON.stringify({ success: true, id: created.id, url: created.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-to-notion error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
