import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe, WeeklyMealPlan, ShoppingListItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface MealPlanContextType {
  currentPlan: WeeklyMealPlan | null;
  portions: number;
  setPortions: (portions: number) => void;
  createMealPlan: (portions: number, selectedRecipes: {
    preWorkout: Recipe;
    meals: Recipe[];
    refuel: Recipe;
  }) => Promise<void>;
  swapRecipe: (category: 'pre-workout' | 'meal' | 'refuel', newRecipe: Recipe, index?: number) => Promise<void>;
  generateShoppingList: () => ShoppingListItem[];
  updateShoppingListItem: (id: string, checked: boolean) => Promise<void>;
  clearMealPlan: () => Promise<void>;
  isLoading: boolean;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const MealPlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<WeeklyMealPlan | null>(null);
  const [portions, setPortions] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  const PLAN_STORAGE_KEY = '@mealforge_meal_plan';
  const SHOPPING_LIST_KEY = '@mealforge_shopping_list';

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const stored = await AsyncStorage.getItem(PLAN_STORAGE_KEY);
      const shoppingStored = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
      if (stored) setCurrentPlan(JSON.parse(stored));
      if (shoppingStored) setShoppingList(JSON.parse(shoppingStored));
    } catch (error) {
      console.error('Failed to load meal plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createMealPlan = async (portions: number, selectedRecipes: {
    preWorkout: Recipe;
    meals: Recipe[];
    refuel: Recipe;
  }) => {
    const newPlan: WeeklyMealPlan = {
      id: uuidv4(),
      portions,
      meals: selectedRecipes,
      createdAt: new Date().toISOString(),
    };
    setPortions(portions);
    setCurrentPlan(newPlan);
    await AsyncStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(newPlan));
    generateAndSaveShoppingList(newPlan);
  };

  const swapRecipe = async (category: 'pre-workout' | 'meal' | 'refuel', newRecipe: Recipe, index?: number) => {
    if (!currentPlan) return;

    const updated = { ...currentPlan };
    if (category === 'pre-workout') {
      updated.meals.preWorkout = newRecipe;
    } else if (category === 'meal' && index !== undefined) {
      updated.meals.meals[index] = newRecipe;
    } else if (category === 'refuel') {
      updated.meals.refuel = newRecipe;
    }

    setCurrentPlan(updated);
    await AsyncStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(updated));
    generateAndSaveShoppingList(updated);
  };

  const generateAndSaveShoppingList = async (plan: WeeklyMealPlan) => {
    const list = generateShoppingListInternal(plan);
    setShoppingList(list);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
  };

  const generateShoppingListInternal = (plan: WeeklyMealPlan): ShoppingListItem[] => {
    const items: { [key: string]: ShoppingListItem } = {};

    const processRecipe = (recipe: Recipe | null) => {
      if (!recipe) return;
      recipe.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase();
        if (items[key]) {
          items[key].multiplier += 1;
        } else {
          items[key] = {
            id: uuidv4(),
            name: ing.name,
            quantity: ing.quantity,
            multiplier: 1,
            category: categorizeItem(ing.name),
            checked: false,
          };
        }
      });
    };

    processRecipe(plan.meals.preWorkout);
    plan.meals.meals.forEach(processRecipe);
    processRecipe(plan.meals.refuel);

    return Object.values(items);
  };

  const categorizeItem = (itemName: string): ShoppingListItem['category'] => {
    const name = itemName.toLowerCase();
    if (['lettuce', 'tomato', 'cucumber', 'carrot', 'broccoli', 'spinach', 'kale', 'apple', 'banana', 'orange', 'berries'].some(p => name.includes(p)))
      return 'produce';
    if (['chicken', 'beef', 'fish', 'salmon', 'steak', 'ground', 'turkey'].some(p => name.includes(p)))
      return 'proteins';
    if (['milk', 'yogurt', 'cheese', 'eggs'].some(p => name.includes(p)))
      return 'dairy';
    if (['rice', 'pasta', 'oats', 'bread', 'flour', 'oil', 'salt'].some(p => name.includes(p)))
      return 'pantry';
    return 'other';
  };

  const generateShoppingList = (): ShoppingListItem[] => {
    return shoppingList;
  };

  const updateShoppingListItem = async (id: string, checked: boolean) => {
    const updated = shoppingList.map(item =>
      item.id === id ? { ...item, checked } : item
    );
    setShoppingList(updated);
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(updated));
  };

  const clearMealPlan = async () => {
    setCurrentPlan(null);
    setPortions(1);
    setShoppingList([]);
    await AsyncStorage.removeItem(PLAN_STORAGE_KEY);
    await AsyncStorage.removeItem(SHOPPING_LIST_KEY);
  };

  return (
    <MealPlanContext.Provider
      value={{
        currentPlan,
        portions,
        setPortions,
        createMealPlan,
        swapRecipe,
        generateShoppingList,
        updateShoppingListItem,
        clearMealPlan,
        isLoading,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within MealPlanProvider');
  }
  return context;
};