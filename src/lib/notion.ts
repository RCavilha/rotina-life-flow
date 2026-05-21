import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "rotina-notion-db-id";

export function getNotionDatabaseId(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

export function setNotionDatabaseId(id: string) {
  localStorage.setItem(STORAGE_KEY, id.trim());
}

export async function sendToNotion(
  type: "Despesa" | "Receita" | "Conta" | "Cartão" | "Tarefa",
  title: string,
  fields: Record<string, unknown>,
) {
  const databaseId = getNotionDatabaseId();
  if (!databaseId) return; // Silent: user hasn't configured Notion yet

  try {
    const { data, error } = await supabase.functions.invoke("send-to-notion", {
      body: {
        databaseId,
        title: `[${type}] ${title}`,
        fields: { Tipo: type, ...fields },
      },
    });
    if (error) throw error;
    if (data?.success === false) throw new Error(data.error);
    toast({ title: "Enviado para o Notion", description: title });
  } catch (e) {
    console.error("Notion sync error", e);
    toast({
      title: "Falha ao enviar ao Notion",
      description: e instanceof Error ? e.message : "Erro desconhecido",
      variant: "destructive",
    });
  }
}
