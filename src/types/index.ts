
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type DietaryPreference = 
  | 'none' 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'low-carb';

export interface RecipeStep {
  number: number;
  step: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: RecipeStep[];
  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: NutritionInfo;
  image?: string;
}

export interface UserPreferences {
  dietaryPreference: DietaryPreference;
  skillLevel: SkillLevel;
}
