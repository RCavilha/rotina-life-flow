import { Home, Wallet, ListTodo, Settings, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: Wallet, label: "Finanças", path: "/financas" },
    { icon: ListTodo, label: "Tarefas", path: "/tarefas" },
    { icon: Settings, label: "Configurações", path: "/config" },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen bg-card border-r border-border fixed left-0 top-0 z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-border">
        <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground transition-colors">
          <Menu size={22} />
        </button>
        {!collapsed && <h1 className="text-xl font-bold text-primary">Rotina</h1>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Rotina v1.0</p>
            <p className="text-xs text-muted-foreground mt-1">Organize sua vida</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
