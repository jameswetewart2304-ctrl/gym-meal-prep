export interface Recipe {
  id: string;
  name: string;
  category: 'pre-workout' | 'meal' | 'refuel';
  ingredients: Ingredient[];
  steps: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  emoji: string;
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export interface WeeklyMealPlan {
  id: string;
  portions: number;
  meals: {
    preWorkout: Recipe | null;
    meals: Recipe[];
    refuel: Recipe | null;
  };
  createdAt: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  multiplier: number;
  category: 'produce' | 'proteins' | 'dairy' | 'pantry' | 'other';
  checked: boolean;
}