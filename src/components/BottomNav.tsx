import { Home, Wallet, ListTodo, Settings } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Início", active: true },
    { icon: Wallet, label: "Finanças" },
    { icon: ListTodo, label: "Tarefas" },
    { icon: Settings, label: "Config" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-large z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 transition-all ${
                item.active
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={24} strokeWidth={item.active ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
