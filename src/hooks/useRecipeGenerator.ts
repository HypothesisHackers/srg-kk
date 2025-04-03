
import { useState } from 'react';
import { Recipe, UserPreferences } from '../types';
import { generateRecipe, saveRecipe, getSavedRecipes } from '../utils/api';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function useRecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreference: 'none',
    skillLevel: 'beginner',
  });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

  const saveCurrentRecipe = async () => {
    if (!recipe || !user) {
      toast({
        title: "Cannot save recipe",
        description: "Please generate a recipe first or make sure you're logged in.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      await saveRecipe(recipe, user.id);
      toast({
        title: "Recipe saved!",
        description: `${recipe.title} has been added to your saved recipes.`,
      });
      
      // Refresh saved recipes list
      loadSavedRecipes();
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error saving recipe",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const loadSavedRecipes = async () => {
    if (!user) return;
    
    setIsLoadingSaved(true);
    
    try {
      const recipes = await getSavedRecipes(user.id);
      setSavedRecipes(recipes);
    } catch (error) {
      console.error("Error loading saved recipes:", error);
      toast({
        title: "Error loading saved recipes",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSaved(false);
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
    savedRecipes,
    isLoading,
    isSaving,
    isLoadingSaved,
    addIngredient,
    removeIngredient,
    updatePreferences,
    generateRecipeFromIngredients,
    saveCurrentRecipe,
    loadSavedRecipes,
    clearAll,
  };
}
