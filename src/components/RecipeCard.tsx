
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import { RecipeSteps } from "@/components/RecipeSteps";
import { NutritionInfo } from "@/components/NutritionInfo";
import { Clock, Copy, Heart, Printer, Share2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRecipeGenerator } from "@/hooks/useRecipeGenerator";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { toast } = useToast();
  const { saveCurrentRecipe, isSaving } = useRecipeGenerator();
  
  const copyRecipe = () => {
    const recipeText = `
      ${recipe.title}
      
      Description: ${recipe.description}
      
      Ingredients:
      ${recipe.ingredients.map(i => `- ${i}`).join('\n')}
      
      Instructions:
      ${recipe.steps.map(s => `${s.number}. ${s.step}`).join('\n')}
      
      Prep Time: ${recipe.prepTime} min
      Cook Time: ${recipe.cookTime} min
      Servings: ${recipe.servings}
    `;
    
    navigator.clipboard.writeText(recipeText.trim());
    toast({
      title: "Recipe copied!",
      description: "The recipe has been copied to your clipboard.",
    });
  };
  
  const printRecipe = () => {
    window.print();
  };
  
  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API. Try copying the recipe instead.",
      });
    }
  };
  
  return (
    <div className="mt-10 mb-10 animate-fade-in" style={{animationDelay: '0.3s'}}>
      <Card className="overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <CardHeader className="pb-2 -mt-16 relative z-10">
          <CardTitle className="text-3xl md:text-4xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-herb-700">
            {recipe.title}
          </CardTitle>
          <CardDescription className="text-foreground/80 text-base mt-2">
            {recipe.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-0 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-herb-50 border border-herb-200 text-herb-800">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-spice-50 border border-spice-200 text-spice-800">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Cook: {recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tomato-50 border border-tomato-200 text-tomato-800">
              <Users className="h-4 w-4 text-tomato-500" />
              <span className="text-sm font-medium">Serves: {recipe.servings}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Ingredients</h3>
              <ul className="space-y-2 list-disc pl-5">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="text-foreground/90">
                    {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                  </li>
                ))}
              </ul>
              
              <div className="pt-2">
                <NutritionInfo nutrition={recipe.nutrition} />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Instructions</h3>
              <RecipeSteps steps={recipe.steps} />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between flex-wrap gap-4 pt-6 pb-6">
          <Button 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/5 text-primary" 
            onClick={copyRecipe}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/5 text-primary" 
            onClick={printRecipe}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary/20 hover:bg-primary/5 text-primary" 
            onClick={shareRecipe}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          
          <Button 
            onClick={saveCurrentRecipe}
            disabled={isSaving}
            className="button-gradient transition-all duration-300 rounded-lg"
          >
            <Heart className={`mr-2 h-4 w-4 ${isSaving ? 'animate-pulse' : ''}`} />
            {isSaving ? "Saving..." : "Save Recipe"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
