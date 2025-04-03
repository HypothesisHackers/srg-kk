
import { Recipe, UserPreferences } from '../types';

const API_KEY = "sk-393cde3907614ca788a8469ef43f9f5a";

// This is a mock API call that mimics what an actual API would return
// In a real application, this would make a call to a backend service
export const generateRecipe = async (
  ingredients: string[],
  preferences: UserPreferences
): Promise<Recipe> => {
  console.log("Generating recipe with:", { ingredients, preferences });
  console.log("Using API Key:", API_KEY);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demo purposes, we're generating a mock recipe based on inputs
  // In a real app, this would call an AI service API
  
  const recipe: Recipe = {
    id: Math.random().toString(36).substring(2, 9),
    title: createRecipeTitle(ingredients, preferences),
    description: createRecipeDescription(ingredients, preferences),
    ingredients: [...ingredients, ...getSuggestedIngredients(ingredients, preferences)],
    steps: createRecipeSteps(preferences.skillLevel),
    prepTime: Math.floor(Math.random() * 20) + 5,
    cookTime: Math.floor(Math.random() * 40) + 10,
    servings: Math.floor(Math.random() * 4) + 2,
    nutrition: calculateNutrition(ingredients, preferences),
    image: getRandomFoodImage(),
  };
  
  return recipe;
};

// Helper functions to generate mock recipe data

function createRecipeTitle(ingredients: string[], preferences: UserPreferences): string {
  const mainIngredient = ingredients[0] || "Mixed";
  const secondaryIngredient = ingredients.length > 1 ? ingredients[1] : "";
  
  const dietPrefix = preferences.dietaryPreference !== 'none' 
    ? `${preferences.dietaryPreference.charAt(0).toUpperCase() + preferences.dietaryPreference.slice(1)} `
    : "";
  
  const titles = [
    `${dietPrefix}${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} ${secondaryIngredient ? '& ' + secondaryIngredient : ''} Delight`,
    `Homemade ${dietPrefix}${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Bowl`,
    `Quick ${dietPrefix}${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} ${secondaryIngredient ? 'with ' + secondaryIngredient : 'Medley'}`,
    `${dietPrefix}Rustic ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Recipe`,
    `${dietPrefix}${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} ${secondaryIngredient ? '& ' + secondaryIngredient : ''} Fusion`
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}

function createRecipeDescription(ingredients: string[], preferences: UserPreferences): string {
  const mainIngredient = ingredients[0] || "ingredients";
  const dietaryInfo = preferences.dietaryPreference !== 'none' 
    ? `This ${preferences.dietaryPreference} recipe ` 
    : "This recipe ";
  
  return `${dietaryInfo}combines the flavors of ${ingredients.join(", ")} into a delicious meal. 
  Perfect for ${preferences.skillLevel} cooks looking to create something special with minimal effort.`;
}

function getSuggestedIngredients(baseIngredients: string[], preferences: UserPreferences): string[] {
  // Common ingredients based on dietary preferences
  const commonIngredients = {
    none: ["salt", "pepper", "olive oil", "garlic", "onion"],
    vegetarian: ["cheese", "eggs", "butter", "yogurt", "milk"],
    vegan: ["nutritional yeast", "tofu", "plant milk", "agave", "coconut oil"],
    "gluten-free": ["gluten-free flour", "tamari", "rice noodles", "cornstarch", "almond flour"],
    "dairy-free": ["coconut milk", "almond milk", "dairy-free butter", "nutritional yeast", "cashew cream"],
    keto: ["butter", "heavy cream", "bacon", "avocado", "cream cheese"],
    paleo: ["coconut oil", "honey", "almond flour", "eggs", "coconut aminos"],
    "low-carb": ["cauliflower", "zucchini", "egg", "cheese", "almond flour"]
  };
  
  // Get common ingredients for the selected dietary preference
  const dietaryIngredients = commonIngredients[preferences.dietaryPreference] || commonIngredients.none;
  
  // Filter out ingredients already in the base list
  const filteredIngredients = dietaryIngredients.filter(
    ingredient => !baseIngredients.includes(ingredient)
  );
  
  // Return 2-3 additional ingredients
  return filteredIngredients.slice(0, Math.floor(Math.random() * 2) + 2);
}

function createRecipeSteps(skillLevel: string): { number: number; step: string }[] {
  const stepsCount = skillLevel === 'beginner' ? 5 : skillLevel === 'intermediate' ? 7 : 9;
  
  const commonSteps = [
    "Prepare all ingredients by washing and chopping as needed.",
    "Heat oil in a pan over medium heat.",
    "Add seasoning to taste.",
    "Serve hot and enjoy!"
  ];
  
  const intermediateSteps = [
    "Combine ingredients in a bowl and mix well.",
    "Let the mixture rest for 10 minutes.",
    "Stir occasionally to prevent sticking."
  ];
  
  const advancedSteps = [
    "Create a reduction by simmering until thickened.",
    "Use a food processor to blend until smooth.",
    "Layer ingredients for optimal flavor distribution."
  ];
  
  let stepsPool = [...commonSteps];
  
  if (skillLevel === 'intermediate' || skillLevel === 'advanced') {
    stepsPool = [...stepsPool, ...intermediateSteps];
  }
  
  if (skillLevel === 'advanced') {
    stepsPool = [...stepsPool, ...advancedSteps];
  }
  
  // Shuffle the steps
  stepsPool.sort(() => Math.random() - 0.5);
  
  // Take the required number of steps
  const selectedSteps = stepsPool.slice(0, stepsCount);
  
  // Always add preparation as first step and serving as last step
  selectedSteps[0] = commonSteps[0];
  selectedSteps[selectedSteps.length - 1] = commonSteps[commonSteps.length - 1];
  
  // Return formatted steps
  return selectedSteps.map((step, index) => ({
    number: index + 1,
    step
  }));
}

function calculateNutrition(ingredients: string[], preferences: UserPreferences): NutritionInfo {
  // In a real app, this would calculate based on a food database
  // For demo purposes, we're generating random values within reasonable ranges
  
  const baseCalories = Math.floor(Math.random() * 300) + 200;
  
  let caloriesModifier = 1;
  let proteinModifier = 1;
  let fatModifier = 1;
  let carbsModifier = 1;
  
  // Adjust based on dietary preference
  switch (preferences.dietaryPreference) {
    case 'keto':
      carbsModifier = 0.3;
      fatModifier = 1.5;
      break;
    case 'low-carb':
      carbsModifier = 0.5;
      break;
    case 'vegan':
    case 'vegetarian':
      proteinModifier = 0.8;
      break;
    case 'paleo':
      carbsModifier = 0.7;
      proteinModifier = 1.2;
      break;
  }
  
  // Calculate final values
  const calories = Math.floor(baseCalories * caloriesModifier * (ingredients.length / 2));
  const protein = Math.floor((Math.random() * 20 + 10) * proteinModifier);
  const fat = Math.floor((Math.random() * 15 + 5) * fatModifier);
  const carbs = Math.floor((Math.random() * 30 + 10) * carbsModifier);
  
  return {
    calories,
    protein,
    fat,
    carbs
  };
}

function getRandomFoodImage(): string {
  const foodImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
  ];
  
  // Append quality parameters for better images
  const randomImage = foodImages[Math.floor(Math.random() * foodImages.length)];
  return `${randomImage}?auto=format&fit=crop&w=800&q=80`;
}
