
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ChefHat } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Extract hash from URL
    const hashFragment = window.location.hash;
    if (hashFragment) {
      // The hash typically starts with '#', so remove it
      setHash(hashFragment.substring(1));
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      
      // Redirect to login page after successful reset
      navigate("/login");
    } catch (error) {
      toast({
        title: "Password reset error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-herb-100 via-spice-50 to-tomato-100 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-herb-200 opacity-50 animate-float"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-spice-200 opacity-50 animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-tomato-200 opacity-50 animate-float" style={{animationDelay: '-4s'}}></div>
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 glass-card rounded-2xl relative z-10">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20">
            <ChefHat className="h-8 w-8 text-primary animate-pulse-soft" />
          </div>
          <h1 className="text-4xl font-bold font-serif text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-herb-700">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            Enter your new password to reset your account
          </p>
        </div>
        
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-muted bg-white/60 backdrop-blur-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border-muted bg-white/60 backdrop-blur-sm"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full button-gradient text-primary-foreground transition-all duration-300 rounded-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <button 
              className="text-primary hover:underline font-medium"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
