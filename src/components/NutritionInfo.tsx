
import { NutritionInfo as NutritionInfoType } from "@/types";

interface NutritionInfoProps {
  nutrition: NutritionInfoType;
}

export function NutritionInfo({ nutrition }: NutritionInfoProps) {
  const { calories, protein, fat, carbs } = nutrition;

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-xl font-semibold">{calories}</div>
          <div className="text-xs text-muted-foreground">Calories</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-semibold">{protein}g</div>
          <div className="text-xs text-muted-foreground">Protein</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-semibold">{fat}g</div>
          <div className="text-xs text-muted-foreground">Fat</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-semibold">{carbs}g</div>
          <div className="text-xs text-muted-foreground">Carbs</div>
        </div>
      </div>
    </div>
  );
}
