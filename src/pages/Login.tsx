
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to Smart Recipe Generator!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary animate-pulse-soft"
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
          <h1 className="text-4xl font-bold font-serif text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-herb-700">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue to Smart Recipe Generator
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-muted bg-white/60 backdrop-blur-sm"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a 
                href="#" 
                className="text-sm text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Password Reset",
                    description: "This feature is not available in the demo.",
                  });
                }}
              >
                Forgot Password?
              </a>
            </div>
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a 
              href="#" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Registration",
                  description: "This feature is not available in the demo.",
                });
              }}
            >
              Create one now
            </a>
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/60 px-2 text-muted-foreground backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-muted hover:bg-herb-100/50 bg-white/50 backdrop-blur-sm transition-all duration-300"
            onClick={() => {
              toast({
                title: "Social Login",
                description: "This feature is not available in the demo.",
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
              <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="border-muted hover:bg-tomato-100/50 bg-white/50 backdrop-blur-sm transition-all duration-300"
            onClick={() => {
              toast({
                title: "Social Login",
                description: "This feature is not available in the demo.",
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-[#1877F2]">
              <path fill="currentColor" d="M24 12.073c0-5.8-4.2-10.6-9.9-11.6v6.5H17v2.9h-2.9v2c0 2.4 1.1 3.7 3.3 3.7.8 0 1.5-.1 2.2-.2v2.7c-.7.1-1.5.2-2.3.2-3.5 0-5.8-2.2-5.8-6.2v-2.2H8.7v-2.9h2.8V.473C5.9 1.473 1.7 6.273 1.7 12.073c0 5.9 4.8 10.7 10.7 10.7s10.7-4.8 10.7-10.7h.9Z"/>
            </svg>
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
