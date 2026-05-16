import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useRecipes } from '../context/RecipeContext';
import { useMealPlan } from '../context/MealPlanContext';
import { Recipe } from '../types';
import { colors } from '../theme';

const BatchCookPlanScreen: React.FC<any> = ({ route, navigation }) => {
  const { portions } = route.params;
  const { recipes } = useRecipes();
  const { createMealPlan } = useMealPlan();
  const [plan, setPlan] = useState<{ preWorkout: Recipe | null; meals: Recipe[]; refuel: Recipe | null }>({
    preWorkout: null,
    meals: [],
    refuel: null,
  });

  useEffect(() => {
    generatePlan();
  }, []);

  const generatePlan = () => {
    const preWorkoutRecipes = recipes.filter(r => r.category === 'pre-workout');
    const mealRecipes = recipes.filter(r => r.category === 'meal');
    const refuelRecipes = recipes.filter(r => r.category === 'refuel');

    if (preWorkoutRecipes.length === 0 || mealRecipes.length < 3 || refuelRecipes.length === 0) {
      alert('You need at least 1 Pre-Workout, 3 Meals, and 1 Refuel recipe to generate a plan.');
      navigation.goBack();
      return;
    }

    const getRandomRecipe = (arr: Recipe[]) => arr[Math.floor(Math.random() * arr.length)];

    const selectedMeals = [getRandomRecipe(mealRecipes), getRandomRecipe(mealRecipes), getRandomRecipe(mealRecipes)];

    setPlan({
      preWorkout: getRandomRecipe(preWorkoutRecipes),
      meals: selectedMeals,
      refuel: getRandomRecipe(refuelRecipes),
    });
  };

  const handleBuild = async () => {
    if (plan.preWorkout && plan.meals.length === 3 && plan.refuel) {
      await createMealPlan(portions, {
        preWorkout: plan.preWorkout,
        meals: plan.meals,
        refuel: plan.refuel,
      });
      navigation.navigate('ShoppingList');
    }
  };

  const RecipeCard = ({ recipe, onSwap }: { recipe: Recipe; onSwap: () => void }) => (
    <Card style={styles.recipeCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.recipeName}>{recipe.name.toUpperCase()}</Text>
          <View style={styles.nutritionRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>🔥</Text>
              <Text style={[styles.badgeValue, { color: colors.orange }]}>{recipe.nutritionInfo.calories}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>💪</Text>
              <Text style={[styles.badgeValue, { color: colors.green }]}>{recipe.nutritionInfo.protein}g</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>🌾</Text>
              <Text style={[styles.badgeValue, { color: colors.blue }]}>{recipe.nutritionInfo.carbs}g</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>🥑</Text>
              <Text style={[styles.badgeValue, { color: colors.purple }]}>{recipe.nutritionInfo.fats}g</Text>
            </View>
          </View>
        </View>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>
      <Button
        mode="outlined"
        onPress={onSwap}
        style={styles.swapButton}
        textColor={colors.orange}
        compact
      >
        🔄 Swap This
      </Button>
    </Card>
  );

  const handleSwapMeal = (index: number) => {
    const meals = recipes.filter(r => r.category === 'meal');
    const newMeal = meals[Math.floor(Math.random() * meals.length)];
    const newPlan = { ...plan };
    newPlan.meals[index] = newMeal;
    setPlan(newPlan);
  };

  const handleSwapPreWorkout = () => {
    const preWorkout = recipes.filter(r => r.category === 'pre-workout');
    setPlan({ ...plan, preWorkout: preWorkout[Math.floor(Math.random() * preWorkout.length)] });
  };

  const handleSwapRefuel = () => {
    const refuel = recipes.filter(r => r.category === 'refuel');
    setPlan({ ...plan, refuel: refuel[Math.floor(Math.random() * refuel.length)] });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Weekly Plan</Text>
        <Text style={styles.subtitle}>{portions} portions</Text>
      </View>

      {plan.preWorkout && (
        <RecipeCard recipe={plan.preWorkout} onSwap={handleSwapPreWorkout} />
      )}
      {plan.meals.map((meal, i) => (
        <RecipeCard key={i} recipe={meal} onSwap={() => handleSwapMeal(i)} />
      ))}
      {plan.refuel && (
        <RecipeCard recipe={plan.refuel} onSwap={handleSwapRefuel} />
      )}

      <View style={styles.floatingButton}>
        <Button
          mode="contained"
          onPress={handleBuild}
          style={styles.buildButton}
          labelStyle={styles.buildLabel}
          icon="check"
        >
          Build Shopping List
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recipeCard: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    padding: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardLeft: {
    flex: 1,
  },
  recipeName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 0.5,
  },
  emoji: {
    fontSize: 32,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  badge: {
    backgroundColor: colors.dark,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 11,
  },
  badgeValue: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 1,
  },
  swapButton: {
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  buildButton: {
    backgroundColor: colors.orange,
    borderRadius: 4,
    paddingVertical: 8,
  },
  buildLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default BatchCookPlanScreen;