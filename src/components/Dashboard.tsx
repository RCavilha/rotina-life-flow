import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Circle,
  Calendar,
  DollarSign,
  ListTodo,
  CreditCard,
  PiggyBank
} from "lucide-react";

const ThemeToggleMobile = () => (
  <div className="text-white [&_button]:text-white [&_button]:hover:bg-white/10">
    <ThemeToggle />
  </div>
);

const Dashboard = () => {
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header with gradient */}
      <header className="bg-gradient-primary text-white px-6 pt-8 pb-12 lg:pb-8 rounded-b-[2rem] lg:rounded-b-none shadow-large">
        <div className="max-w-md lg:max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rotina</h1>
            <p className="text-white/90 capitalize">{currentMonth}</p>
          </div>
          <div className="lg:hidden">
            <ThemeToggleMobile />
          </div>
        </div>
      </header>

      <div className="max-w-md lg:max-w-6xl mx-auto px-6 -mt-8 lg:mt-6">
        {/* Desktop: 3-column grid / Mobile: stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Financial Summary + Quick Actions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Financial Summary Card */}
            <Card className="p-6 shadow-medium bg-gradient-card animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="text-primary" size={24} />
                  <h2 className="font-semibold text-lg">Resumo Financeiro</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-success/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-success" size={18} />
                    <span className="text-sm text-muted-foreground">Receitas</span>
                  </div>
                  <p className="text-2xl font-bold text-success">R$ 5.420</p>
                </div>
                
                <div className="bg-expense/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="text-expense" size={18} />
                    <span className="text-sm text-muted-foreground">Despesas</span>
                  </div>
                  <p className="text-2xl font-bold text-expense">R$ 3.240</p>
                </div>

                <div className="bg-primary/10 p-4 rounded-xl col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="text-primary" size={18} />
                    <span className="text-sm text-muted-foreground">Saldo</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">R$ 2.180</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
              <Button className="h-auto py-4 flex-col gap-2 bg-gradient-success hover:opacity-90 transition-opacity">
                <DollarSign size={24} />
                <span className="text-sm">Nova Receita</span>
              </Button>
              <Button className="h-auto py-4 flex-col gap-2 bg-gradient-expense hover:opacity-90 transition-opacity">
                <CreditCard size={24} />
                <span className="text-sm">Nova Despesa</span>
              </Button>
              <Button className="hidden lg:flex h-auto py-4 flex-col gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20">
                <ListTodo size={24} />
                <span className="text-sm">Nova Tarefa</span>
              </Button>
              <Button className="hidden lg:flex h-auto py-4 flex-col gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20">
                <Calendar size={24} />
                <span className="text-sm">Agendar</span>
              </Button>
            </div>

            {/* Accounts Overview - Desktop: side by side with bills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-soft animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="text-primary" size={20} />
                    <h3 className="font-semibold">Contas</h3>
                  </div>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Conta Corrente</p>
                      <p className="text-sm text-muted-foreground">Banco Principal</p>
                    </div>
                    <p className="font-semibold text-primary">R$ 1.850</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium">Poupança</p>
                      <p className="text-sm text-muted-foreground">Reserva</p>
                    </div>
                    <p className="font-semibold text-success">R$ 8.500</p>
                  </div>
                </div>
              </Card>

              {/* Upcoming Bills */}
              <Card className="p-6 shadow-soft animate-fade-in">
                <h3 className="font-semibold mb-4">Contas Próximas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-expense/5 rounded-lg border-l-4 border-expense">
                    <div>
                      <p className="font-medium">Internet</p>
                      <p className="text-sm text-muted-foreground">Vence em 3 dias</p>
                    </div>
                    <p className="font-semibold text-expense">R$ 99,90</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-expense/5 rounded-lg border-l-4 border-expense">
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-muted-foreground">Vence em 5 dias</p>
                    </div>
                    <p className="font-semibold text-expense">R$ 1.240</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Column 2 (sidebar on desktop): Tasks */}
          <div className="space-y-6">
            {/* Today's Tasks */}
            <Card className="p-6 shadow-soft animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ListTodo className="text-primary" size={20} />
                  <h3 className="font-semibold">Tarefas de Hoje</h3>
                </div>
                <span className="text-sm text-muted-foreground">3/5</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-success flex-shrink-0" size={20} />
                  <span className="text-muted-foreground line-through">Levar o cachorro para passear</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-success flex-shrink-0" size={20} />
                  <span className="text-muted-foreground line-through">Pagar conta de luz</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-success flex-shrink-0" size={20} />
                  <span className="text-muted-foreground line-through">Comprar mantimentos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="text-muted-foreground flex-shrink-0" size={20} />
                  <span className="font-medium">Agendar consulta médica</span>
                </div>
                <div className="flex items-center gap-3">
                  <Circle className="text-muted-foreground flex-shrink-0" size={20} />
                  <span className="font-medium">Treino na academia</span>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                <Calendar size={16} className="mr-2" />
                Ver todas as tarefas
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
