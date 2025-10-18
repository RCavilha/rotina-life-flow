import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { 
  ArrowLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  Landmark,
  MoreVertical,
  Calendar,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Financas = () => {
  const navigate = useNavigate();
  
  const transactions = [
    { id: 1, name: "Salário", category: "Receita", value: 5420, date: "2025-10-15", type: "income", paid: true },
    { id: 2, name: "Supermercado", category: "Alimentação", value: -240, date: "2025-10-14", type: "expense", paid: true },
    { id: 3, name: "Netflix", category: "Entretenimento", value: -39.90, date: "2025-10-13", type: "expense", paid: true },
    { id: 4, name: "Gasolina", category: "Transporte", value: -180, date: "2025-10-12", type: "expense", paid: true },
    { id: 5, name: "Aluguel", category: "Moradia", value: -1200, date: "2025-10-20", type: "expense", paid: false },
    { id: 6, name: "Internet", category: "Utilidades", value: -99.90, date: "2025-10-21", type: "expense", paid: false },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-primary pb-20">
      {/* Header */}
      <header className="text-white px-6 pt-8 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Finanças</h1>
          </div>
          
          {/* Balance Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
            <p className="text-primary-foreground/80 text-sm mb-1">Saldo Total</p>
            <p className="text-3xl font-bold mb-4">R$ 10.330</p>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-primary-foreground/80 text-xs mb-1">Receitas</p>
                <p className="text-lg font-semibold">R$ 5.420</p>
              </div>
              <div className="flex-1">
                <p className="text-primary-foreground/80 text-xs mb-1">Despesas</p>
                <p className="text-lg font-semibold">R$ 3.240</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 mt-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="h-auto py-4 flex-col gap-2 bg-gradient-success hover:opacity-90 transition-opacity">
            <TrendingUp size={22} />
            <span className="text-sm">Nova Receita</span>
          </Button>
          <Button className="h-auto py-4 flex-col gap-2 bg-gradient-expense hover:opacity-90 transition-opacity">
            <TrendingDown size={22} />
            <span className="text-sm">Nova Despesa</span>
          </Button>
        </div>

        {/* Accounts Section */}
        <Card className="p-5 mb-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Contas Bancárias</h3>
            <Button variant="ghost" size="sm">
              <Plus size={18} />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Landmark className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Conta Corrente</p>
                <p className="text-sm text-muted-foreground">Banco Principal</p>
              </div>
              <p className="font-bold text-primary">R$ 1.850</p>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <PiggyBank className="text-success" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Poupança</p>
                <p className="text-sm text-muted-foreground">Reserva Emergência</p>
              </div>
              <p className="font-bold text-success">R$ 8.500</p>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <CreditCard className="text-accent" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-muted-foreground">Limite disponível</p>
              </div>
              <p className="font-bold text-accent">R$ 2.760</p>
            </div>
          </div>
        </Card>

        {/* Transactions Section */}
        <Card className="p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Transações</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Filter size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar size={18} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-success/10' 
                    : transaction.paid 
                      ? 'bg-expense/10' 
                      : 'bg-muted'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="text-success" size={20} />
                  ) : (
                    <TrendingDown className={transaction.paid ? "text-expense" : "text-muted-foreground"} size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' 
                      ? 'text-success' 
                      : transaction.paid 
                        ? 'text-expense' 
                        : 'text-muted-foreground'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}
                    {transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical size={16} />
                </Button>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4">
            Ver todas as transações
          </Button>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default Financas;
