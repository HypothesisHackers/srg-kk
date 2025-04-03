
import { useState } from 'react';
import { Recipe, UserPreferences } from '../types';
import { generateRecipe } from '../utils/api';
import { useToast } from "@/hooks/use-toast";

export function useRecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreference: 'none',
    skillLevel: 'beginner',
  });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addIngredient = (ingredient: string) => {
    if (!ingredient.trim()) return;
    
    // Check if ingredient already exists
    if (ingredients.includes(ingredient.trim().toLowerCase())) {
      toast({
        title: "Ingredient already added",
        description: `${ingredient} is already in your list.`,
        variant: "destructive",
      });
      return;
    }
    
    setIngredients([...ingredients, ingredient.trim().toLowerCase()]);
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences({ ...preferences, ...newPreferences });
  };

  const generateRecipeFromIngredients = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to generate a recipe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const newRecipe = await generateRecipe(ingredients, preferences);
      setRecipe(newRecipe);
      toast({
        title: "Recipe generated!",
        description: `Enjoy your ${newRecipe.title}.`,
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error generating recipe",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setIngredients([]);
    setRecipe(null);
  };

  return {
    ingredients,
    preferences,
    recipe,
    isLoading,
    addIngredient,
    removeIngredient,
    updatePreferences,
    generateRecipeFromIngredients,
    clearAll,
  };
}
