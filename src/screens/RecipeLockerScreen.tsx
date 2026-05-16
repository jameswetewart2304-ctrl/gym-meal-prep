import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Button, Segmented, Card, IconButton } from 'react-native-paper';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types';
import { colors } from '../theme';

type Category = 'pre-workout' | 'meal' | 'refuel';

const RecipeLockerScreen: React.FC<any> = ({ navigation }) => {
  const { recipes, deleteRecipe } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState<Category>('pre-workout');

  const categoryEmoji = {
    'pre-workout': '⚡',
    meal: '🥩',
    refuel: '💪',
  };

  const filteredRecipes = recipes.filter(r => r.category === selectedCategory);

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <Card style={styles.recipeCard}>
      <View style={styles.recipeHeader}>
        <View>
          <Text style={styles.recipeName}>{recipe.name.toUpperCase()}</Text>
          <View style={styles.recipeMetrics}>
            <Text style={styles.metricText}>📋 {recipe.steps.length} steps</Text>
            <Text style={styles.metricText}>• 🥘 {recipe.ingredients.length} ingredients</Text>
          </View>
        </View>
        <Text style={styles.recipeEmoji}>{recipe.emoji}</Text>
      </View>
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionBadge}>
          <Text style={styles.nutritionLabel}>CAL</Text>
          <Text style={[styles.nutritionValue, { color: colors.orange }]}>
            {recipe.nutritionInfo.calories}
          </Text>
        </View>
        <View style={styles.nutritionBadge}>
          <Text style={styles.nutritionLabel}>PRO</Text>
          <Text style={[styles.nutritionValue, { color: colors.green }]}>
            {recipe.nutritionInfo.protein}g
          </Text>
        </View>
        <View style={styles.nutritionBadge}>
          <Text style={styles.nutritionLabel}>CARBS</Text>
          <Text style={[styles.nutritionValue, { color: colors.blue }]}>
            {recipe.nutritionInfo.carbs}g
          </Text>
        </View>
        <View style={styles.nutritionBadge}>
          <Text style={styles.nutritionLabel}>FAT</Text>
          <Text style={[styles.nutritionValue, { color: colors.purple }]}>
            {recipe.nutritionInfo.fats}g
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          mode="text"
          onPress={() => deleteRecipe(recipe.id)}
          textColor={colors.orange}
          compact
        >
          Delete
        </Button>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipe Locker</Text>
      </View>

      <Segmented
        value={selectedCategory}
        onValueChange={(val) => setSelectedCategory(val as Category)}
        buttons={[
          { value: 'pre-workout', label: '⚡ Pre-Workout' },
          { value: 'meal', label: '🥩 Meals' },
          { value: 'refuel', label: '💪 Refuels' },
        ]}
        style={styles.segmented}
      />

      <ScrollView style={styles.content}>
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {selectedCategory} recipes yet</Text>
            <Text style={styles.emptySubtext}>Add one to get started</Text>
          </View>
        ) : (
          filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
        )}
      </ScrollView>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddRecipe')}
        style={styles.fab}
        labelStyle={styles.fabLabel}
        icon="plus"
      >
        Add Recipe
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  segmented: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: colors.darkSurface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipeCard: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    padding: 12,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  recipeMetrics: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 4,
  },
  metricText: {
    fontSize: 11,
    color: colors.muted,
  },
  recipeEmoji: {
    fontSize: 28,
  },
  nutritionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  nutritionBadge: {
    flex: 1,
    backgroundColor: colors.dark,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 9,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nutritionValue: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.orange,
    borderRadius: 4,
  },
  fabLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyState: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 8,
  },
});

export default RecipeLockerScreen;