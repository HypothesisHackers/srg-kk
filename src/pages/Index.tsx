
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IngredientInput } from "@/components/IngredientInput";
import { PreferencesSelector } from "@/components/PreferencesSelector";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipeGenerator } from "@/hooks/useRecipeGenerator";

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
      
      <main className="flex-1 container max-w-5xl py-8">
        <Hero />
        
        <div className="p-6 rounded-xl bg-card border shadow-md backdrop-blur-sm bg-white/70">
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
          <div className="mt-8 p-8 text-center text-muted-foreground bg-white/50 backdrop-blur-sm rounded-xl border border-muted/50 shadow-sm">
            <p className="text-lg font-medium">
              Enter your ingredients and preferences, then click "Generate Recipe" to see your personalized recipe.
            </p>
            <p className="mt-2 text-sm">
              Our AI will create a unique recipe based on what you have available.
            </p>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm">
        <div className="container">
          Smart Recipe Generator &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
