import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Landmark } from "lucide-react";

interface NovaContaFormProps {
  onClose: () => void;
}

const NovaContaForm = ({ onClose }: NovaContaFormProps) => {
  const [nome, setNome] = useState("");
  const [banco, setBanco] = useState("");
  const [tipo, setTipo] = useState("");
  const [saldo, setSaldo] = useState("");
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
            <Landmark size={24} />
            <h1 className="text-2xl font-bold">Nova Conta Bancária</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md lg:max-w-2xl mx-auto px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Card className="p-5 shadow-soft space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Conta</Label>
              <Input id="nome" placeholder="Ex: Conta Corrente Principal" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banco">Banco / Instituição</Label>
              <Input id="banco" placeholder="Ex: Nubank, Itaú, Bradesco..." value={banco} onChange={e => setBanco(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Conta</Label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Poupança</SelectItem>
                    <SelectItem value="investimento">Investimento</SelectItem>
                    <SelectItem value="carteira">Carteira Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="saldo">Saldo Inicial (R$)</Label>
                <Input id="saldo" type="number" step="0.01" placeholder="0,00" value={saldo} onChange={e => setSaldo(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cor de Identificação</Label>
              <div className="flex gap-3">
                {["hsl(168,70%,45%)", "hsl(220,70%,55%)", "hsl(280,70%,55%)", "hsl(35,90%,55%)", "hsl(340,70%,55%)"].map(c => (
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

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="flex-1">Salvar Conta</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaContaForm;
