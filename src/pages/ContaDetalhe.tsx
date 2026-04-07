import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {
  ArrowLeft, TrendingUp, TrendingDown, Landmark, PiggyBank, CreditCard,
  ChevronRight
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const accounts = [
  {
    id: "corrente",
    name: "Conta Corrente",
    subtitle: "Banco Principal",
    balance: 1850,
    icon: Landmark,
    color: "primary",
    transactions: [
      { id: 1, name: "Salário", value: 5420, date: "2025-10-15", type: "income", category: "Receita", paid: true, notes: "Salário mensal" },
      { id: 4, name: "Gasolina", value: -180, date: "2025-10-12", type: "expense", category: "Transporte", paid: true, notes: "Abastecimento" },
      { id: 5, name: "Aluguel", value: -1200, date: "2025-10-20", type: "expense", category: "Moradia", paid: false, notes: "Aluguel apartamento" },
      { id: 6, name: "Internet", value: -99.90, date: "2025-10-21", type: "expense", category: "Utilidades", paid: false, notes: "Plano fibra" },
      { id: 10, name: "Energia Elétrica", value: -210, date: "2025-10-05", type: "expense", category: "Utilidades", paid: true, notes: "Conta de luz" },
    ]
  },
  {
    id: "poupanca",
    name: "Poupança",
    subtitle: "Reserva Emergência",
    balance: 8500,
    icon: PiggyBank,
    color: "success",
    transactions: [
      { id: 20, name: "Depósito mensal", value: 500, date: "2025-10-05", type: "income", category: "Poupança", paid: true, notes: "Reserva de emergência" },
      { id: 21, name: "Rendimento", value: 42.50, date: "2025-10-01", type: "income", category: "Rendimento", paid: true, notes: "Rendimento mensal" },
    ]
  },
  {
    id: "cartao",
    name: "Cartão de Crédito",
    subtitle: "Limite disponível",
    balance: 2760,
    icon: CreditCard,
    color: "accent",
    transactions: [
      { id: 2, name: "Supermercado", value: -240, date: "2025-10-14", type: "expense", category: "Alimentação", paid: true, notes: "Compras semanais" },
      { id: 3, name: "Netflix", value: -39.90, date: "2025-10-13", type: "expense", category: "Entretenimento", paid: true, notes: "Assinatura mensal" },
      { id: 8, name: "Farmácia", value: -85.50, date: "2025-10-09", type: "expense", category: "Saúde", paid: true, notes: "Medicamentos" },
      { id: 9, name: "Restaurante", value: -120, date: "2025-10-08", type: "expense", category: "Alimentação", paid: true, notes: "Jantar" },
      { id: 11, name: "Academia", value: -89.90, date: "2025-10-01", type: "expense", category: "Saúde", paid: true, notes: "Mensalidade" },
    ]
  },
];

type Transaction = typeof accounts[0]["transactions"][0];

const ContaDetalhe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const account = accounts.find(a => a.id === id);

  if (!account) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Conta não encontrada</p>
            <Button onClick={() => navigate('/financas')}>Voltar</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = account.icon;
  const income = account.transactions.filter(t => t.type === "income").reduce((s, t) => s + t.value, 0);
  const expense = account.transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.value), 0);

  const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary", iconBg: "bg-primary/10" },
    success: { bg: "bg-success/10", text: "text-success", iconBg: "bg-success/10" },
    accent: { bg: "bg-accent/10", text: "text-accent", iconBg: "bg-accent/10" },
  };
  const colors = colorMap[account.color] || colorMap.primary;

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <header className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-6 shadow-large">
          <div className="max-w-md lg:max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate('/financas')} className="hover:opacity-80 transition-opacity">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">{account.name}</h1>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-sm">{account.subtitle}</p>
                  <p className="text-3xl font-bold">
                    {account.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-primary-foreground/70 text-xs">Entradas</p>
                  <p className="font-semibold text-success">
                    {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-xs">Saídas</p>
                  <p className="font-semibold text-expense">
                    {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-md lg:max-w-4xl mx-auto px-6 mt-6">
          <h2 className="font-semibold text-lg mb-3">Movimentações</h2>
          <Card className="shadow-soft divide-y divide-border">
            {account.transactions.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTransaction(t)}
                className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  t.type === 'income' ? 'bg-success/10' : t.paid ? 'bg-expense/10' : 'bg-muted'
                }`}>
                  {t.type === 'income' ? (
                    <TrendingUp className="text-success" size={20} />
                  ) : (
                    <TrendingDown className={t.paid ? "text-expense" : "text-muted-foreground"} size={20} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-semibold ${
                    t.type === 'income' ? 'text-success' : t.paid ? 'text-expense' : 'text-muted-foreground'
                  }`}>
                    {t.type === 'income' ? '+' : ''}
                    {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground shrink-0" size={18} />
              </button>
            ))}
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTransaction.name}</DialogTitle>
                <DialogDescription>Detalhes da transação</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center py-2">
                  <p className={`text-3xl font-bold ${
                    selectedTransaction.type === 'income' ? 'text-success' : 'text-expense'
                  }`}>
                    {selectedTransaction.type === 'income' ? '+' : ''}
                    {selectedTransaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Categoria</p>
                    <Badge variant="secondary">{selectedTransaction.category}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Data</p>
                    <p className="font-medium">
                      {new Date(selectedTransaction.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <Badge variant={selectedTransaction.paid ? "default" : "outline"}>
                      {selectedTransaction.paid ? "Pago" : "Pendente"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Conta</p>
                    <p className="font-medium">{account.name}</p>
                  </div>
                  {selectedTransaction.notes && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">Observações</p>
                      <p className="font-medium">{selectedTransaction.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ContaDetalhe;
