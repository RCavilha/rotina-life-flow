import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { 
  ArrowLeft,
  Plus,
  Circle,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  ShoppingCart,
  MoreVertical,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Tarefas = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Levar o cachorro para passear", time: "08:00", completed: true, recurring: true, category: "Diária" },
    { id: 2, title: "Pagar conta de luz", time: "10:00", completed: true, recurring: false, category: "Financeiro" },
    { id: 3, title: "Comprar mantimentos", time: "14:00", completed: true, recurring: false, category: "Compras", hasShoppingList: true },
    { id: 4, title: "Agendar consulta médica", time: "15:00", completed: false, recurring: false, category: "Saúde" },
    { id: 5, title: "Treino na academia", time: "18:00", completed: false, recurring: true, category: "Exercício" },
    { id: 6, title: "Reunião com cliente", time: "16:00", completed: false, recurring: false, category: "Trabalho", shared: true },
  ]);

  const upcomingTasks = [
    { id: 7, title: "Revisão do carro", date: "Amanhã", category: "Manutenção" },
    { id: 8, title: "Aniversário da Maria", date: "23 Out", category: "Pessoal" },
    { id: 9, title: "Pagar internet", date: "25 Out", category: "Financeiro" },
  ];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        {/* Header */}
        <header className="bg-gradient-primary text-primary-foreground px-6 pt-8 pb-8 shadow-large lg:rounded-none">
          <div className="max-w-md lg:max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity lg:hidden">
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">Tarefas</h1>
            </div>
            
            {/* Progress Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 lg:flex lg:items-center lg:gap-8">
              <div className="flex items-center justify-between lg:justify-start lg:gap-8 mb-3 lg:mb-0 flex-1">
                <div>
                  <p className="text-primary-foreground/80 text-sm mb-1">Hoje</p>
                  <p className="text-2xl font-bold">
                    {completedCount}/{tasks.length} concluídas
                  </p>
                </div>
                <div className="text-right lg:text-left">
                  <div className="text-4xl font-bold">
                    {Math.round((completedCount / tasks.length) * 100)}%
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full lg:w-64 bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-md lg:max-w-6xl mx-auto px-6 mt-6">
          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <Button className="flex-1 lg:flex-none h-auto py-4 flex-col gap-2 bg-gradient-primary hover:opacity-90 transition-opacity lg:px-8">
              <Plus size={22} />
              <span className="text-sm">Nova Tarefa</span>
            </Button>
            <Button className="h-auto px-6 py-4 flex-col gap-2" variant="secondary">
              <ShoppingCart size={22} />
              <span className="text-sm">Lista</span>
            </Button>
          </div>

          {/* Desktop: 3-col / Mobile: stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Tasks - 2 cols on desktop */}
            <Card className="p-5 shadow-soft lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Tarefas de Hoje</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Filter size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-all ${
                      task.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="flex-shrink-0 hover:scale-110 transition-transform"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="text-success" size={24} />
                      ) : (
                        <Circle className="text-muted-foreground" size={24} />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} />
                          {task.time}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {task.category}
                        </span>
                        {task.recurring && <span className="text-xs text-muted-foreground">🔁</span>}
                        {task.hasShoppingList && <span className="text-xs text-muted-foreground">🛒</span>}
                        {task.shared && (
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Users size={12} />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right column: Upcoming + Shared */}
            <div className="space-y-6">
              {/* Upcoming Tasks */}
              <Card className="p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Próximas Tarefas</h3>
                  <Button variant="ghost" size="sm">
                    <Calendar size={18} />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {upcomingTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-accent" size={20} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.date}</p>
                      </div>
                      
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {task.category}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4">
                  Ver calendário completo
                </Button>
              </Card>

              {/* Shared Tasks */}
              <Card className="p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    <h3 className="font-semibold text-lg">Compartilhadas</h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-card rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Reunião com cliente</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Trabalho
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-card">
                          A
                        </div>
                        <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-xs flex items-center justify-center border-2 border-card">
                          M
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Você e Maria
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tarefas;
