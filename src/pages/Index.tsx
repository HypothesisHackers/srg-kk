
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IngredientInput } from "@/components/IngredientInput";
import { PreferencesSelector } from "@/components/PreferencesSelector";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipeGenerator } from "@/hooks/useRecipeGenerator";
import { CookingPot, Sparkles } from "lucide-react";

const Index = () => {
  const {
    ingredients,
    preferences,
    recipe,
    isLoading,
    addIngredient,
    removeIngredient,
    updatePreferences,
    generateRecipeFromIngredients,
    clearAll,
  } = useRecipeGenerator();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-herb-50 via-spice-50 to-tomato-50">
      <Header />
      
      <main className="flex-1 container max-w-5xl py-8 px-4">
        <Hero />
        
        <div className="glass-card p-6 rounded-xl border shadow-lg backdrop-blur-sm bg-white/80 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-10 rounded-full bg-spice-300 mx-1"></div>
            <div className="h-1 w-16 rounded-full bg-primary mx-1"></div>
            <div className="h-1 w-10 rounded-full bg-tomato-300 mx-1"></div>
          </div>
          
          <IngredientInput
            ingredients={ingredients}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onClear={clearAll}
          />
          
          <PreferencesSelector
            preferences={preferences}
            onUpdate={updatePreferences}
            onGenerate={generateRecipeFromIngredients}
            isLoading={isLoading}
          />
        </div>
        
        {recipe && <RecipeCard recipe={recipe} />}
        
        {!recipe && !isLoading && (
          <div className="mt-8 p-8 text-center glass-card rounded-xl border border-muted/50 shadow-md animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-herb-100 p-3 border border-herb-200">
                <CookingPot className="h-8 w-8 text-primary" />
              </div>
            </div>
            <p className="text-lg font-medium mb-2">
              Enter your ingredients and preferences, then click "Generate Recipe" to see your personalized recipe.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 inline mr-1 text-secondary" />
              Our AI will create a unique recipe based on what you have available.
            </p>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm shadow-inner">
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif">Smart Recipe Generator</span>
            <span className="text-muted-foreground/50">•</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
