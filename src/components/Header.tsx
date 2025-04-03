
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
            >
              <path d="M12 2v1" />
              <path d="M12 21v1" />
              <path d="m4.93 4.93.7.7" />
              <path d="m18.36 18.36.7.7" />
              <path d="M2 12h1" />
              <path d="M21 12h1" />
              <path d="m4.93 19.07.7-.7" />
              <path d="m18.36 5.64.7-.7" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <h1 className="text-lg font-serif font-bold tracking-tight">
            Smart Recipe Generator
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User size={16} />
                <span>{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
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
