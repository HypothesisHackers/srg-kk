
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { LogOut, User, ChefHat } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-1.5 shadow-sm">
            <ChefHat className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-lg font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-herb-700">
            Smart Recipe Generator
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-herb-50 border border-herb-200 text-herb-800 shadow-sm">
                <User size={16} className="text-primary" />
                <span>{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-muted-foreground hover:text-foreground hover:bg-tomato-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
