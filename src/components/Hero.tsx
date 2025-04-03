
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="hero-gradient py-12 px-6 md:py-16 md:px-12 rounded-2xl mb-8 animate-fade-in relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-herb-300 animate-float"></div>
        <div className="absolute top-1/3 -right-10 w-32 h-32 rounded-full bg-spice-300 animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute -bottom-10 left-1/4 w-36 h-36 rounded-full bg-tomato-300 animate-float" style={{animationDelay: '-4s'}}></div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-sm font-medium text-primary border border-herb-200 shadow-sm mb-4">
          <Sparkles className="h-4 w-4 mr-1 text-secondary" />
          <span>AI-Powered Recipe Generation</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Turn Your <span className="relative inline-block">
            <span className="relative z-10">Ingredients</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-spice-200 opacity-70 -z-0 rounded"></span>
          </span> Into 
          <span className="relative inline-block ml-2">
            <span className="relative z-10">Amazing</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-herb-200 opacity-70 -z-0 rounded"></span>
          </span> Recipes
        </h1>
        
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Enter what you have in your kitchen, set your preferences, and let our AI create the perfect recipe for you.
        </p>
        
        <Button
          className="rounded-full px-8 py-7 text-base button-gradient shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={() => {
            const inputElement = document.getElementById('ingredient-input');
            if (inputElement) {
              inputElement.scrollIntoView({ behavior: 'smooth' });
              inputElement.focus();
            }
          }}
        >
          <span>Get Started</span>
          <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
}
