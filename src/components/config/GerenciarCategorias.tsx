import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tags, Plus, X, ListChecks } from "lucide-react";
import {
  useFinCategorias,
  useTaskCategorias,
  addFinCategoria,
  removeFinCategoria,
  addSubcategoria,
  removeSubcategoria,
  addTaskCategoria,
  removeTaskCategoria,
  FinCategoria,
} from "@/lib/categorias";
import { toast } from "@/hooks/use-toast";

const tipoLabel = (t: FinCategoria["tipo"]) =>
  t === "despesa" ? "Despesa" : t === "receita" ? "Receita" : "Ambos";

const GerenciarCategorias = () => {
  const finCats = useFinCategorias();
  const taskCats = useTaskCategorias();

  const [novaFinNome, setNovaFinNome] = useState("");
  const [novaFinTipo, setNovaFinTipo] = useState<FinCategoria["tipo"]>("despesa");
  const [novaSubCatId, setNovaSubCatId] = useState("");
  const [novaSubNome, setNovaSubNome] = useState("");
  const [novaTaskNome, setNovaTaskNome] = useState("");

  const handleAddFin = () => {
    if (!novaFinNome.trim()) return;
    addFinCategoria(novaFinNome.trim(), novaFinTipo);
    setNovaFinNome("");
    toast({ title: "Categoria adicionada" });
  };

  const handleAddSub = () => {
    if (!novaSubCatId || !novaSubNome.trim()) return;
    addSubcategoria(novaSubCatId, novaSubNome.trim());
    setNovaSubNome("");
    toast({ title: "Subcategoria adicionada" });
  };

  const handleAddTask = () => {
    if (!novaTaskNome.trim()) return;
    addTaskCategoria(novaTaskNome.trim());
    setNovaTaskNome("");
    toast({ title: "Categoria adicionada" });
  };

  return (
    <Card className="p-6 shadow-soft animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Tags className="text-primary" size={20} />
        <h2 className="font-semibold text-lg">Categorias</h2>
      </div>

      <Tabs defaultValue="financas">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="financas">Finanças</TabsTrigger>
          <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
        </TabsList>

        <TabsContent value="financas" className="space-y-6">
          {/* Add finance category */}
          <div className="space-y-3 p-4 rounded-lg bg-secondary/40">
            <Label>Nova categoria</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Nome da categoria"
                value={novaFinNome}
                onChange={(e) => setNovaFinNome(e.target.value)}
                className="flex-1"
              />
              <Select value={novaFinTipo} onValueChange={(v) => setNovaFinTipo(v as FinCategoria["tipo"])}>
                <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="despesa">Despesa</SelectItem>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddFin} type="button">
                <Plus size={16} className="mr-1" /> Adicionar
              </Button>
            </div>
          </div>

          {/* Add subcategory */}
          <div className="space-y-3 p-4 rounded-lg bg-secondary/40">
            <Label>Nova subcategoria</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={novaSubCatId} onValueChange={setNovaSubCatId}>
                <SelectTrigger className="sm:w-48"><SelectValue placeholder="Categoria" /></SelectTrigger>
                <SelectContent>
                  {finCats.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Nome da subcategoria"
                value={novaSubNome}
                onChange={(e) => setNovaSubNome(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddSub} type="button" disabled={!novaSubCatId}>
                <Plus size={16} className="mr-1" /> Adicionar
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {finCats.map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.nome}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {tipoLabel(c.tipo)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-expense hover:text-expense"
                    onClick={() => removeFinCategoria(c.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                {c.subcategorias.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-1">
                    {c.subcategorias.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSubcategoria(c.id, s)}
                          className="text-muted-foreground hover:text-expense"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tarefas" className="space-y-4">
          <div className="space-y-3 p-4 rounded-lg bg-secondary/40">
            <Label>Nova categoria de tarefa</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Estudos"
                value={novaTaskNome}
                onChange={(e) => setNovaTaskNome(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddTask} type="button">
                <Plus size={16} className="mr-1" /> Adicionar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {taskCats.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 text-sm bg-secondary px-3 py-1.5 rounded-full"
              >
                <ListChecks size={14} className="text-primary" />
                {c}
                <button
                  type="button"
                  onClick={() => removeTaskCategoria(c)}
                  className="text-muted-foreground hover:text-expense ml-1"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default GerenciarCategorias;
