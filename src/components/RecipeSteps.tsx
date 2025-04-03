
import { RecipeStep } from "@/types";

interface RecipeStepsProps {
  steps: RecipeStep[];
}

export function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Instructions</h3>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="recipe-step">
            <div className="recipe-step-number">{step.number}</div>
            <div className="flex-1">{step.step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
