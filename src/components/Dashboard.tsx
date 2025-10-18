import { Wallet, TrendingUp, ShoppingCart, ListTodo, Download } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          ROTINA
        </h1>
      </div>

      {/* Financial Summary */}
      <div className="mb-6 animate-fade-in">
        <h2 className="text-sm text-white/90 mb-2">Saldo Atual</h2>
        <div className="text-5xl font-bold text-success mb-6">R$ 5.890,50</div>
        
        {/* Chart placeholder - "Despesas vs. Receitas" */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 h-48 flex items-center justify-center">
          <div className="text-xs text-white/70 text-center">Despesas vs. Receitas</div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-card rounded-2xl p-6 shadow-large mb-4">
          <h3 className="text-base font-semibold text-card-foreground mb-4">Lançamentos Rápidos</h3>
          <div className="space-y-3 mb-6">
            <button className="w-full bg-expense text-expense-foreground p-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-soft">
              <ShoppingCart size={20} />
              <span className="font-medium">Nova Despesa</span>
            </button>
            <button className="w-full bg-success text-success-foreground p-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-soft">
              <TrendingUp size={20} />
              <span className="font-medium">Nova Receita</span>
            </button>
          </div>

          <h3 className="text-base font-semibold text-card-foreground mb-3">Próximas Despesas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-card-foreground">Alimentação - Mercado</div>
                <div className="text-xs text-muted-foreground">15/10/2023</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-card-foreground">R$ 350,00</div>
                <div className="text-xs text-muted-foreground">Não Pago</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-card-foreground">Parcela Empréstimo</div>
                <div className="text-xs text-muted-foreground">20/10/2023</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-card-foreground">R$ 1.200,00</div>
                <div className="text-xs text-muted-foreground">Não Pago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Circular Menu */}
      <div className="mb-6 grid grid-cols-4 gap-4 px-2">
        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
            <Wallet size={28} className="text-primary-foreground" />
          </div>
          <span className="text-xs text-white font-medium">Contas</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
            <TrendingUp size={28} className="text-primary-foreground" />
          </div>
          <span className="text-xs text-white font-medium">Investimentos</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
            <ListTodo size={28} className="text-primary-foreground" />
          </div>
          <span className="text-xs text-white font-medium">Categorias</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-medium hover:scale-105 transition-transform">
            <Download size={28} className="text-primary-foreground" />
          </div>
          <span className="text-xs text-white font-medium">Exportar</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
