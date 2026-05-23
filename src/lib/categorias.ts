import { useEffect, useState } from "react";

const FIN_KEY = "rotina-fin-categorias";
const TASK_KEY = "rotina-task-categorias";
const EVT = "rotina-categorias-changed";

export type FinCategoria = {
  id: string;
  nome: string;
  tipo: "despesa" | "receita" | "ambos";
  subcategorias: string[];
};

const defaultFin: FinCategoria[] = [
  { id: "alimentacao", nome: "Alimentação", tipo: "despesa", subcategorias: ["Supermercado", "Restaurante", "Delivery", "Lanches"] },
  { id: "moradia", nome: "Moradia", tipo: "despesa", subcategorias: ["Aluguel", "Condomínio", "IPTU", "Manutenção"] },
  { id: "transporte", nome: "Transporte", tipo: "despesa", subcategorias: ["Combustível", "Estacionamento", "Transporte público", "Manutenção"] },
  { id: "entretenimento", nome: "Entretenimento", tipo: "despesa", subcategorias: ["Streaming", "Cinema", "Jogos", "Viagens"] },
  { id: "saude", nome: "Saúde", tipo: "despesa", subcategorias: ["Plano de saúde", "Farmácia", "Consultas", "Academia"] },
  { id: "educacao", nome: "Educação", tipo: "despesa", subcategorias: ["Cursos", "Livros", "Material escolar"] },
  { id: "utilidades", nome: "Utilidades", tipo: "despesa", subcategorias: ["Internet", "Telefone", "Energia", "Água"] },
  { id: "salario", nome: "Salário", tipo: "receita", subcategorias: [] },
  { id: "freelance", nome: "Freelance", tipo: "receita", subcategorias: [] },
  { id: "investimentos", nome: "Investimentos", tipo: "receita", subcategorias: [] },
  { id: "alugueis", nome: "Aluguéis", tipo: "receita", subcategorias: [] },
  { id: "outros", nome: "Outros", tipo: "ambos", subcategorias: [] },
];

const defaultTask: string[] = [
  "Diária", "Financeiro", "Compras", "Saúde", "Exercício", "Trabalho", "Manutenção", "Pessoal",
];

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(EVT));
}

export function getFinCategorias(): FinCategoria[] {
  return read(FIN_KEY, defaultFin);
}

export function setFinCategorias(cats: FinCategoria[]) {
  write(FIN_KEY, cats);
}

export function getTaskCategorias(): string[] {
  return read(TASK_KEY, defaultTask);
}

export function setTaskCategorias(cats: string[]) {
  write(TASK_KEY, cats);
}

export function useFinCategorias() {
  const [cats, setCats] = useState<FinCategoria[]>(getFinCategorias);
  useEffect(() => {
    const h = () => setCats(getFinCategorias());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return cats;
}

export function useTaskCategorias() {
  const [cats, setCats] = useState<string[]>(getTaskCategorias);
  useEffect(() => {
    const h = () => setCats(getTaskCategorias());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return cats;
}

function slug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function addFinCategoria(nome: string, tipo: FinCategoria["tipo"]) {
  const cats = getFinCategorias();
  const id = slug(nome) || `cat-${Date.now()}`;
  if (cats.some(c => c.id === id)) return;
  setFinCategorias([...cats, { id, nome, tipo, subcategorias: [] }]);
}

export function removeFinCategoria(id: string) {
  setFinCategorias(getFinCategorias().filter(c => c.id !== id));
}

export function addSubcategoria(catId: string, sub: string) {
  const cats = getFinCategorias();
  setFinCategorias(cats.map(c => c.id === catId && !c.subcategorias.includes(sub) ? { ...c, subcategorias: [...c.subcategorias, sub] } : c));
}

export function removeSubcategoria(catId: string, sub: string) {
  const cats = getFinCategorias();
  setFinCategorias(cats.map(c => c.id === catId ? { ...c, subcategorias: c.subcategorias.filter(s => s !== sub) } : c));
}

export function addTaskCategoria(nome: string) {
  const cats = getTaskCategorias();
  if (cats.includes(nome)) return;
  setTaskCategorias([...cats, nome]);
}

export function removeTaskCategoria(nome: string) {
  setTaskCategorias(getTaskCategorias().filter(c => c !== nome));
}
