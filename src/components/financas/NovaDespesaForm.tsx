import { useState } from "react";
import { sendToNotion } from "@/lib/notion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingDown, CalendarIcon, RefreshCw, CreditCard } from "lucide-react";

interface NovaDespesaFormProps {
  onClose: () => void;
}

const NovaDespesaForm = ({ onClose }: NovaDespesaFormProps) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [data, setData] = useState("");
  const [notas, setNotas] = useState("");
  const [pago, setPago] = useState(false);
  const [recorrente, setRecorrente] = useState(false);
  const [frequencia, setFrequencia] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [parcelado, setParcelado] = useState(false);

  const subcategorias: Record<string, string[]> = {
    alimentacao: ["Supermercado", "Restaurante", "Delivery", "Lanches"],
    moradia: ["Aluguel", "Condomínio", "IPTU", "Manutenção"],
    transporte: ["Combustível", "Estacionamento", "Transporte público", "Manutenção"],
    entretenimento: ["Streaming", "Cinema", "Jogos", "Viagens"],
    saude: ["Plano de saúde", "Farmácia", "Consultas", "Academia"],
    educacao: ["Cursos", "Livros", "Material escolar"],
    utilidades: ["Internet", "Telefone", "Energia", "Água"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendToNotion("Despesa", nome || "Despesa sem nome", {
      Valor: valor ? `R$ ${valor}` : "",
      Data: data,
      Categoria: categoria,
      Subcategoria: subcategoria,
      Notas: notas,
      Pago: pago ? "Sim" : "Não",
      Recorrente: recorrente ? frequencia || "Sim" : "Não",
      Parcelado: parcelado ? `${parcelas}x` : "Não",
    });
    onClose();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <header className="bg-gradient-expense text-primary-foreground px-6 pt-8 pb-6 shadow-large">
        <div className="max-w-md lg:max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
            </button>
            <TrendingDown size={24} />
            <h1 className="text-2xl font-bold">Nova Despesa</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md lg:max-w-2xl mx-auto px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="p-5 shadow-soft space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Ex: Supermercado, Aluguel..." value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" value={valor} onChange={e => setValor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" value={data} onChange={e => setData(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={categoria} onValueChange={(v) => { setCategoria(v); setSubcategoria(""); }}>
                  <SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentacao">Alimentação</SelectItem>
                    <SelectItem value="moradia">Moradia</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="entretenimento">Entretenimento</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="utilidades">Utilidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subcategoria</Label>
                <Select value={subcategoria} onValueChange={setSubcategoria} disabled={!categoria}>
                  <SelectTrigger><SelectValue placeholder="Subcategoria" /></SelectTrigger>
                  <SelectContent>
                    {(subcategorias[categoria] || []).map(sub => (
                      <SelectItem key={sub} value={sub.toLowerCase()}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="pago">Já pago</Label>
              </div>
              <Switch id="pago" checked={pago} onCheckedChange={setPago} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-muted-foreground" />
                <Label htmlFor="recorrente">Recorrente</Label>
              </div>
              <Switch id="recorrente" checked={recorrente} onCheckedChange={(v) => { setRecorrente(v); if (v) setParcelado(false); }} />
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-muted-foreground" />
                <Label htmlFor="parcelado">Parcelado</Label>
              </div>
              <Switch id="parcelado" checked={parcelado} onCheckedChange={(v) => { setParcelado(v); if (v) setRecorrente(false); }} />
            </div>

            {parcelado && (
              <div className="space-y-2 pl-7">
                <Label htmlFor="parcelas">Número de parcelas</Label>
                <Input id="parcelas" type="number" min="2" placeholder="Ex: 12" value={parcelas} onChange={e => setParcelas(e.target.value)} />
              </div>
            )}
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="flex-1 bg-gradient-expense">Salvar Despesa</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaDespesaForm;
