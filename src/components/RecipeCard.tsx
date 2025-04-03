
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/types";
import { NutritionInfo } from "./NutritionInfo";
import { RecipeSteps } from "./RecipeSteps";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="recipe-card">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="md:flex-1">
            <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-muted-foreground mb-4">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>Prep: {recipe.prepTime} min</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>Cook: {recipe.cookTime} min</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>Serves: {recipe.servings}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-foreground/90">{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <NutritionInfo nutrition={recipe.nutrition} />
          </div>
          
          {recipe.image && (
            <div className="md:w-1/3 mb-4 md:mb-0 md:sticky md:top-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg object-cover w-full aspect-square"
              />
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <RecipeSteps steps={recipe.steps} />
        </div>
      </div>
    </div>
  );
}
