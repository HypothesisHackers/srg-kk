
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase, hasRealSupabaseCredentials } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthUser = {
  id: string;
  email: string;
  name: string;
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have real Supabase credentials
        if (!hasRealSupabaseCredentials()) {
          console.warn("Using mock Supabase credentials. Authentication features will be limited.");
          setIsLoading(false);
          return;
        }
        
        // Check for active session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          handleSessionUser(session);
        }
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session) {
              handleSessionUser(session);
            } else {
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        );
        
        // Cleanup subscription
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Helper to format Supabase user to our app's user type
  const handleSessionUser = (session: Session) => {
    const supabaseUser = session.user;
    if (supabaseUser) {
      const formattedUser: AuthUser = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      };
      setUser(formattedUser);
      setIsAuthenticated(true);
    }
  };

  // Sign in with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!hasRealSupabaseCredentials()) {
      toast({
        title: "Demo mode",
        description: "Authentication is in demo mode. Set your Supabase credentials to enable full authentication.",
        variant: "default",
      });
      
      // Create a mock user in demo mode
      const mockUser: AuthUser = {
        id: "demo-user-id",
        email: email,
        name: email.split('@')[0] || 'Demo User',
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Sign out
  const logout = async () => {
    if (!hasRealSupabaseCredentials()) {
      // Handle logout in demo mode
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Logged out",
        description: "You have been logged out from demo mode.",
      });
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: "Logout error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout 
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
