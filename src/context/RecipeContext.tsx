import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  getRecipesByCategory: (category: Recipe['category']) => Recipe[];
  isLoading: boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = '@mealforge_recipes';

  // Load recipes from AsyncStorage on mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipes = async (newRecipes: Recipe[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
      setRecipes(newRecipes);
    } catch (error) {
      console.error('Failed to save recipes:', error);
    }
  };

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    await saveRecipes([...recipes, newRecipe]);
  };

  const deleteRecipe = async (id: string) => {
    await saveRecipes(recipes.filter(r => r.id !== id));
  };

  const getRecipesByCategory = (category: Recipe['category']) => {
    return recipes.filter(r => r.category === category);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        deleteRecipe,
        getRecipesByCategory,
        isLoading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }
  return context;
};