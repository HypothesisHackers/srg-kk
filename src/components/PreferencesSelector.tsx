
import { useState } from "react";
import { DietaryPreference, SkillLevel, UserPreferences } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreferencesSelectorProps {
  preferences: UserPreferences;
  onUpdate: (preferences: Partial<UserPreferences>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function PreferencesSelector({
  preferences,
  onUpdate,
  onGenerate,
  isLoading,
}: PreferencesSelectorProps) {
  const dietaryOptions: Array<{ value: DietaryPreference; label: string }> = [
    { value: "none", label: "No restrictions" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "low-carb", label: "Low-Carb" },
  ];

  const skillOptions: Array<{ value: SkillLevel; label: string }> = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Your Preferences</h2>
        <p className="text-muted-foreground">
          Customize your recipe to match your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="dietary-preference" className="text-sm font-medium">
            Dietary Preference
          </label>
          <Select
            value={preferences.dietaryPreference}
            onValueChange={(value: DietaryPreference) =>
              onUpdate({ dietaryPreference: value })
            }
          >
            <SelectTrigger id="dietary-preference">
              <SelectValue placeholder="Select dietary preference" />
            </SelectTrigger>
            <SelectContent>
              {dietaryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="skill-level" className="text-sm font-medium">
            Cooking Skill Level
          </label>
          <Select
            value={preferences.skillLevel}
            onValueChange={(value: SkillLevel) =>
              onUpdate({ skillLevel: value })
            }
          >
            <SelectTrigger id="skill-level">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              {skillOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full md:w-auto mt-4"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-slow-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating Recipe...
          </>
        ) : (
          "Generate Recipe"
        )}
      </Button>
    </div>
  );
}
