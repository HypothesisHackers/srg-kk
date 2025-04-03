
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="hero-gradient py-10 md:py-16 px-4 rounded-xl mb-8 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Turn Your Ingredients Into Amazing Recipes
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl mx-auto">
          Enter what you have in your kitchen, set your preferences, and let our AI create the perfect recipe for you.
        </p>
        <Button
          className="rounded-full px-6 py-6 text-base bg-primary hover:bg-primary/90"
          onClick={() => {
            const inputElement = document.getElementById('ingredient-input');
            if (inputElement) {
              inputElement.scrollIntoView({ behavior: 'smooth' });
              inputElement.focus();
            }
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
