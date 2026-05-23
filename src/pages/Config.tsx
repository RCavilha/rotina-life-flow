import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor, User, Bell, Shield, HelpCircle, LogOut, Database } from "lucide-react";
import { useState } from "react";
import { getNotionDatabaseId, setNotionDatabaseId } from "@/lib/notion";
import { toast } from "@/hooks/use-toast";
import GerenciarCategorias from "@/components/config/GerenciarCategorias";

const Config = () => {
  const { theme, setTheme } = useTheme();
  const [notionId, setNotionId] = useState(getNotionDatabaseId());

  const options = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
  ] as const;

  const saveNotion = () => {
    setNotionDatabaseId(notionId);
    toast({
      title: notionId ? "Notion conectado" : "Sincronização desativada",
      description: notionId
        ? "Novos registros serão enviados ao seu banco de dados do Notion."
        : "Os registros não serão mais enviados ao Notion.",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <header className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-10 lg:pb-8 rounded-b-[2rem] lg:rounded-b-none shadow-large">
          <div className="max-w-md lg:max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Configurações</h1>
            <p className="text-primary-foreground/90">Personalize sua experiência</p>
          </div>
        </header>

        <div className="max-w-md lg:max-w-6xl mx-auto px-6 -mt-6 lg:mt-6 space-y-6">
          {/* Aparência */}
          <Card className="p-6 shadow-medium bg-gradient-card animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="text-primary" size={20} />
              <h2 className="font-semibold text-lg">Aparência</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Escolha entre o tema claro ou escuro.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {options.map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <Icon size={28} />
                    <span className="font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Perfil */}
          <Card className="p-6 shadow-soft animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-primary" size={20} />
              <h2 className="font-semibold text-lg">Perfil</h2>
            </div>
            <div className="space-y-3">
              <SettingRow label="Nome" value="Usuário Rotina" />
              <SettingRow label="E-mail" value="usuario@rotina.app" />
              <SettingRow label="Moeda" value="BRL (R$)" />
            </div>
          </Card>

          {/* Sincronização com Notion */}
          <Card className="p-6 shadow-soft animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Database className="text-primary" size={20} />
              <h2 className="font-semibold text-lg">Sincronizar com Notion</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Cada nova transação, conta ou cartão é enviado automaticamente para um banco de dados do Notion.
              Compartilhe seu banco com a integração e cole abaixo o ID dele (parte final da URL).
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="notion-db">ID do Banco de Dados (Notion)</Label>
                <Input
                  id="notion-db"
                  placeholder="Ex: 1a2b3c4d5e6f7890..."
                  value={notionId}
                  onChange={(e) => setNotionId(e.target.value)}
                />
              </div>
              <Button onClick={saveNotion} className="w-full">
                Salvar
              </Button>
            </div>
          </Card>

          <GerenciarCategorias />




          {/* Outras */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <OptionCard icon={Bell} title="Notificações" desc="Lembretes e alertas" />
            <OptionCard icon={Shield} title="Privacidade" desc="Segurança e dados" />
            <OptionCard icon={HelpCircle} title="Ajuda" desc="Suporte e FAQ" />
          </div>

          <Button variant="outline" className="w-full text-expense border-expense/40 hover:bg-expense/10 hover:text-expense">
            <LogOut size={18} className="mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const SettingRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const OptionCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <Card className="p-5 shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
    <Icon className="text-primary mb-3" size={22} />
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </Card>
);

export default Config;
