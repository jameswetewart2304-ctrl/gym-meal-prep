import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Snackbar } from 'react-native-paper';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types';
import { colors } from '../theme';

const AddRecipeScreen: React.FC<any> = ({ navigation }) => {
  const { addRecipe } = useRecipes();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'pre-workout' | 'meal' | 'refuel'>('meal');
  const [ingredientsText, setIngredientsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [emoji, setEmoji] = useState('🍽️');
  const [error, setError] = useState('');

  const handleAddRecipe = async () => {
    if (!name.trim() || !ingredientsText.trim() || !stepsText.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const ingredients = ingredientsText.split('\n').filter(l => l.trim()).map((line, i) => ({
      id: i.toString(),
      name: line.trim(),
      quantity: '1',
    }));

    const steps = stepsText.split('\n').filter(l => l.trim());

    const recipe: Omit<Recipe, 'id' | 'createdAt'> = {
      name,
      category,
      ingredients,
      steps,
      nutritionInfo: {
        calories: parseInt(calories) || 0,
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fats: parseInt(fats) || 0,
      },
      emoji,
    };

    await addRecipe(recipe);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Recipe</Text>
      </View>

      <TextInput
        label="Recipe Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="e.g., Chicken & Rice Bowl"
      />

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Category</Text>
        <SegmentedButtons
          value={category}
          onValueChange={(val) => setCategory(val as any)}
          buttons={[
            { value: 'pre-workout', label: '⚡' },
            { value: 'meal', label: '🥩' },
            { value: 'refuel', label: '💪' },
          ]}
          style={styles.segmented}
        />
      </View>

      <TextInput
        label="Emoji Icon"
        value={emoji}
        onChangeText={setEmoji}
        maxLength={2}
        style={styles.input}
      />

      <TextInput
        label="Ingredients (one per line)"
        value={ingredientsText}
        onChangeText={setIngredientsText}
        multiline
        numberOfLines={5}
        style={[styles.input, styles.multilineInput]}
        placeholder="200g chicken breast\n2 cups rice\n1 broccoli"
      />

      <TextInput
        label="Steps (one per line)"
        value={stepsText}
        onChangeText={setStepsText}
        multiline
        numberOfLines={5}
        style={[styles.input, styles.multilineInput]}
        placeholder="Cook chicken in pan\nBoil rice separately"
      />

      <View style={styles.nutritionGrid}>
        <TextInput
          label="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          style={styles.nutritionInput}
        />
        <TextInput
          label="Protein (g)"
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
          style={styles.nutritionInput}
        />
        <TextInput
          label="Carbs (g)"
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
          style={styles.nutritionInput}
        />
        <TextInput
          label="Fats (g)"
          value={fats}
          onChangeText={setFats}
          keyboardType="numeric"
          style={styles.nutritionInput}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleAddRecipe}
        style={styles.submitButton}
        labelStyle={styles.submitLabel}
      >
        Save Recipe
      </Button>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.darkSurface,
    marginBottom: 16,
    borderRadius: 4,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  segmented: {
    backgroundColor: colors.darkSurface,
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  nutritionInput: {
    flex: 1,
    backgroundColor: colors.darkSurface,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: colors.orange,
    paddingVertical: 8,
    borderRadius: 4,
  },
  submitLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default AddRecipeScreen;