import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Check, ChevronDown, Plus, Settings2, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type CategoriaOption = { id: string; nome: string };

interface CategoriaPickerProps {
  value: string;
  onChange: (id: string) => void;
  options: CategoriaOption[];
  onAdd?: (nome: string) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  /** Show "manage" link to /config */
  manageLink?: boolean;
  icon?: React.ReactNode;
}

const CategoriaPicker = ({
  value,
  onChange,
  options,
  onAdd,
  placeholder = "Selecione",
  emptyText = "Nenhuma categoria",
  disabled,
  manageLink = true,
  icon,
}: CategoriaPickerProps) => {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [novo, setNovo] = useState("");

  const selected = options.find((o) => o.id === value);

  const handleAdd = () => {
    const nome = novo.trim();
    if (!nome || !onAdd) return;
    onAdd(nome);
    // generate same id as lib (slug)
    const id = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onChange(id);
    setNovo("");
    setAdding(false);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (!v) setAdding(false); }}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal h-10",
            !selected && "text-muted-foreground",
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {icon ?? <Tag size={16} className="opacity-60" />}
            {selected ? selected.nome : placeholder}
          </span>
          <ChevronDown size={16} className="opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width] min-w-[260px]" align="start">
        <Command>
          <CommandInput placeholder="Buscar categoria..." />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.length > 0 && (
              <CommandGroup heading="Categorias">
                {options.map((opt) => (
                  <CommandItem
                    key={opt.id}
                    value={opt.nome}
                    onSelect={() => { onChange(opt.id); setOpen(false); }}
                  >
                    <Tag size={14} className="mr-2 opacity-60" />
                    <span className="flex-1">{opt.nome}</span>
                    {value === opt.id && <Check size={16} className="text-primary" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            <div className="p-2 space-y-2">
              {onAdd && (
                adding ? (
                  <div className="flex gap-2">
                    <Input
                      autoFocus
                      placeholder="Nome da nova categoria"
                      value={novo}
                      onChange={(e) => setNovo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); handleAdd(); }
                        if (e.key === "Escape") { setAdding(false); setNovo(""); }
                      }}
                      className="h-9"
                    />
                    <Button type="button" size="sm" onClick={handleAdd} disabled={!novo.trim()}>
                      Criar
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-primary hover:text-primary"
                    onClick={() => setAdding(true)}
                  >
                    <Plus size={16} className="mr-2" /> Adicionar nova categoria
                  </Button>
                )
              )}
              {manageLink && (
                <Button
                  asChild
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground"
                >
                  <Link to="/config" onClick={() => setOpen(false)}>
                    <Settings2 size={16} className="mr-2" /> Gerenciar categorias
                  </Link>
                </Button>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoriaPicker;
