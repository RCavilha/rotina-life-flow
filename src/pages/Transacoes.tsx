import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {
  ArrowLeft, TrendingUp, TrendingDown, Filter, Calendar,
  Search, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const allTransactions = [
  { id: 1, name: "Salário", category: "Receita", subcategory: "CLT", value: 5420, date: "2025-10-15", type: "income", paid: true, notes: "Salário mensal empresa XYZ", account: "Conta Corrente" },
  { id: 2, name: "Supermercado", category: "Alimentação", subcategory: "Compras do mês", value: -240, date: "2025-10-14", type: "expense", paid: true, notes: "Compras semanais no Carrefour", account: "Cartão de Crédito" },
  { id: 3, name: "Netflix", category: "Entretenimento", subcategory: "Streaming", value: -39.90, date: "2025-10-13", type: "expense", paid: true, notes: "Assinatura mensal", account: "Cartão de Crédito" },
  { id: 4, name: "Gasolina", category: "Transporte", subcategory: "Combustível", value: -180, date: "2025-10-12", type: "expense", paid: true, notes: "Abastecimento completo", account: "Conta Corrente" },
  { id: 5, name: "Aluguel", category: "Moradia", subcategory: "Aluguel", value: -1200, date: "2025-10-20", type: "expense", paid: false, notes: "Aluguel do apartamento", account: "Conta Corrente" },
  { id: 6, name: "Internet", category: "Utilidades", subcategory: "Telecom", value: -99.90, date: "2025-10-21", type: "expense", paid: false, notes: "Plano fibra 300mb", account: "Conta Corrente" },
  { id: 7, name: "Freelance Design", category: "Receita", subcategory: "Freelance", value: 1500, date: "2025-10-10", type: "income", paid: true, notes: "Projeto de identidade visual", account: "Conta Corrente" },
  { id: 8, name: "Farmácia", category: "Saúde", subcategory: "Medicamentos", value: -85.50, date: "2025-10-09", type: "expense", paid: true, notes: "Medicamentos mensais", account: "Cartão de Crédito" },
  { id: 9, name: "Restaurante", category: "Alimentação", subcategory: "Refeições fora", value: -120, date: "2025-10-08", type: "expense", paid: true, notes: "Jantar com amigos", account: "Cartão de Crédito" },
  { id: 10, name: "Energia Elétrica", category: "Utilidades", subcategory: "Energia", value: -210, date: "2025-10-05", type: "expense", paid: true, notes: "Conta de luz outubro", account: "Conta Corrente" },
  { id: 11, name: "Academia", category: "Saúde", subcategory: "Fitness", value: -89.90, date: "2025-10-01", type: "expense", paid: true, notes: "Mensalidade SmartFit", account: "Cartão de Crédito" },
  { id: 12, name: "Dividendos", category: "Receita", subcategory: "Investimentos", value: 320, date: "2025-10-03", type: "income", paid: true, notes: "Dividendos ações ITUB4", account: "Conta Investimentos" },
];

type Transaction = typeof allTransactions[0];

const Transacoes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filtered = allTransactions
    .filter(t => filterType === "all" || t.type === filterType)
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

  const totalIncome = filtered.filter(t => t.type === "income").reduce((s, t) => s + t.value, 0);
  const totalExpense = filtered.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.value), 0);

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <header className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-6 shadow-large">
          <div className="max-w-md lg:max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate('/financas')} className="hover:opacity-80 transition-opacity">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">Transações</h1>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-primary-foreground/70 text-xs">Receitas</p>
                <p className="text-lg font-semibold text-success">
                  {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <div>
                <p className="text-primary-foreground/70 text-xs">Despesas</p>
                <p className="text-lg font-semibold text-expense">
                  {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-md lg:max-w-4xl mx-auto px-6 mt-6 space-y-4">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar transação..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {(["all", "income", "expense"] as const).map(type => (
              <Button
                key={type}
                size="sm"
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className={filterType === type ? "" : "border-border"}
              >
                {type === "all" ? "Todas" : type === "income" ? "Receitas" : "Despesas"}
              </Button>
            ))}
          </div>

          <Card className="shadow-soft divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">Nenhuma transação encontrada.</p>
            ) : (
              filtered.map(t => (
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
              ))
            )}
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          {selectedTransaction && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedTransaction.type === 'income' ? 'bg-success/10' : 'bg-expense/10'
                  }`}>
                    {selectedTransaction.type === 'income' ? (
                      <TrendingUp className="text-success" size={16} />
                    ) : (
                      <TrendingDown className="text-expense" size={16} />
                    )}
                  </div>
                  {selectedTransaction.name}
                </DialogTitle>
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
                    <p className="text-muted-foreground mb-1">Subcategoria</p>
                    <p className="font-medium">{selectedTransaction.subcategory}</p>
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
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">Conta</p>
                    <p className="font-medium">{selectedTransaction.account}</p>
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

export default Transacoes;
