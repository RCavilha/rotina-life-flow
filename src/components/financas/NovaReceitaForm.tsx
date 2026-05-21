import { useState } from "react";
import { sendToNotion } from "@/lib/notion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, CalendarIcon, RefreshCw } from "lucide-react";

interface NovaReceitaFormProps {
  onClose: () => void;
}

const NovaReceitaForm = ({ onClose }: NovaReceitaFormProps) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [notas, setNotas] = useState("");
  const [recebido, setRecebido] = useState(false);
  const [recorrente, setRecorrente] = useState(false);
  const [frequencia, setFrequencia] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendToNotion("Receita", nome || "Receita sem nome", {
      Valor: valor ? `R$ ${valor}` : "",
      Data: data,
      Categoria: categoria,
      Notas: notas,
      Recebido: recebido ? "Sim" : "Não",
      Recorrente: recorrente ? frequencia || "Sim" : "Não",
    });
    onClose();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <header className="bg-gradient-success text-primary-foreground px-6 pt-8 pb-6 shadow-large">
        <div className="max-w-md lg:max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
            </button>
            <TrendingUp size={24} />
            <h1 className="text-2xl font-bold">Nova Receita</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md lg:max-w-2xl mx-auto px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="p-5 shadow-soft space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Ex: Salário, Freelance..." value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" value={valor} onChange={e => setValor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <div className="relative">
                  <Input id="data" type="date" value={data} onChange={e => setData(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger><SelectValue placeholder="Selecione a categoria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="salario">Salário</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="investimentos">Investimentos</SelectItem>
                  <SelectItem value="alugueis">Aluguéis</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas</Label>
              <Textarea id="notas" placeholder="Observações..." value={notas} onChange={e => setNotas(e.target.value)} rows={3} />
            </div>
          </Card>

          <Card className="p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-muted-foreground" />
                <Label htmlFor="recebido">Já recebido</Label>
              </div>
              <Switch id="recebido" checked={recebido} onCheckedChange={setRecebido} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-muted-foreground" />
                <Label htmlFor="recorrente">Recorrente</Label>
              </div>
              <Switch id="recorrente" checked={recorrente} onCheckedChange={setRecorrente} />
            </div>

            {recorrente && (
              <div className="space-y-2 pl-7">
                <Label>Frequência</Label>
                <Select value={frequencia} onValueChange={setFrequencia}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="flex-1 bg-gradient-success">Salvar Receita</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaReceitaForm;
