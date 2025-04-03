
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
  onClear: () => void;
}

export function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
  onClear,
}: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Your Ingredients</h2>
        <p className="text-muted-foreground">
          Enter the ingredients you have on hand.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          id="ingredient-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add an ingredient (e.g., chicken, tomatoes, rice)"
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex flex-wrap gap-1">
        {ingredients.length > 0 ? (
          <>
            {ingredients.map((ingredient) => (
              <div
                key={ingredient}
                className="ingredient-tag group"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => onRemove(ingredient)}
                  className="ml-1 rounded-full hover:bg-background/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {ingredient}</span>
                </button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground mt-1"
            >
              Clear All
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            No ingredients added yet. Add some ingredients to get started.
          </p>
        )}
      </div>
    </div>
  );
}
