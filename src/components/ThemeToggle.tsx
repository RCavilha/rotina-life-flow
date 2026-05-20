import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className={className}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;
