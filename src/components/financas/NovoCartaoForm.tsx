import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard } from "lucide-react";

interface NovoCartaoFormProps {
  onClose: () => void;
}

const NovoCartaoForm = ({ onClose }: NovoCartaoFormProps) => {
  const [nome, setNome] = useState("");
  const [bandeira, setBandeira] = useState("");
  const [limite, setLimite] = useState("");
  const [fechamento, setFechamento] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [cor, setCor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <header className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-6 shadow-large">
        <div className="max-w-md lg:max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onClose} className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
            </button>
            <CreditCard size={24} />
            <h1 className="text-2xl font-bold">Novo Cartão</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md lg:max-w-2xl mx-auto px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="p-5 shadow-soft space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Cartão</Label>
              <Input id="nome" placeholder="Ex: Nubank, Inter..." value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bandeira</Label>
                <Select value={bandeira} onValueChange={setBandeira}>
                  <SelectTrigger><SelectValue placeholder="Bandeira" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="elo">Elo</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                    <SelectItem value="hipercard">Hipercard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limite">Limite (R$)</Label>
                <Input id="limite" type="number" step="0.01" placeholder="0,00" value={limite} onChange={e => setLimite(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechamento">Dia de Fechamento</Label>
                <Input id="fechamento" type="number" min="1" max="31" placeholder="Ex: 15" value={fechamento} onChange={e => setFechamento(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vencimento">Dia de Vencimento</Label>
                <Input id="vencimento" type="number" min="1" max="31" placeholder="Ex: 25" value={vencimento} onChange={e => setVencimento(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cor do Cartão</Label>
              <div className="flex gap-3">
                {["hsl(280,70%,45%)", "hsl(220,70%,55%)", "hsl(168,70%,45%)", "hsl(0,0%,20%)", "hsl(35,90%,55%)"].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${cor === c ? "border-foreground scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Card Preview */}
          <Card className="p-5 shadow-soft">
            <p className="text-sm text-muted-foreground mb-3">Pré-visualização</p>
            <div
              className="rounded-2xl p-5 h-44 flex flex-col justify-between text-primary-foreground"
              style={{ background: cor || "hsl(220,70%,55%)" }}
            >
              <div className="flex justify-between items-start">
                <p className="font-bold text-lg">{nome || "Nome do Cartão"}</p>
                <CreditCard size={28} />
              </div>
              <div>
                <p className="text-sm opacity-80">•••• •••• •••• ••••</p>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Fecha: {fechamento || "--"}</span>
                  <span>Vence: {vencimento || "--"}</span>
                  <span className="uppercase font-semibold">{bandeira || "Bandeira"}</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="flex-1">Salvar Cartão</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoCartaoForm;
