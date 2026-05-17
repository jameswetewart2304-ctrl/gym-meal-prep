import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, ProgressBar } from 'react-native-paper';
import { useMealPlan } from '../context/MealPlanContext';
import { colors } from '../theme';

const CookModeScreen: React.FC<any> = ({ navigation }) => {
  const { currentPlan } = useMealPlan();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  if (!currentPlan) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No meal plan found</Text>
      </View>
    );
  }

  const allRecipes = [
    currentPlan.meals.preWorkout,
    ...currentPlan.meals.meals,
    currentPlan.meals.refuel,
  ].filter(Boolean);

  const allSteps = allRecipes.flatMap(recipe =>
    recipe!.steps.map(step => ({
      id: `${recipe!.id}-${step}`,
      step,
      recipe: recipe!.name,
      emoji: recipe!.emoji,
    }))
  );

  const currentStep = allSteps[currentStepIndex];
  const progress = (currentStepIndex + 1) / allSteps.length;

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleFinish = () => {
    navigation.navigate('Home');
  };

  const isStepCompleted = completedSteps.includes(currentStep.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cook Mode</Text>
        <ProgressBar progress={progress} style={styles.progressBar} color={colors.orange} />
        <Text style={styles.stepCounter}>
          Step {currentStepIndex + 1} of {allSteps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Card style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepEmoji}>{currentStep.emoji}</Text>
            <Text style={styles.stepRecipe}>{currentStep.recipe.toUpperCase()}</Text>
          </View>
          <Text style={styles.stepText}>{currentStep.step}</Text>
        </Card>

        <View style={styles.upcomingSteps}>
          <Text style={styles.upcomingTitle}>Next Steps</Text>
          {allSteps.slice(currentStepIndex + 1, currentStepIndex + 3).map((step, i) => (
            <Card key={i} style={styles.upcomingCard}>
              <Text style={styles.upcomingText}>{step.step}</Text>
              <Text style={styles.upcomingRecipe}>{step.recipe}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={handlePreviousStep}
          disabled={currentStepIndex === 0}
          style={styles.navButton}
          textColor={colors.orange}
        >
          ← Back
        </Button>
        <Button
          mode="contained"
          onPress={handleStepComplete}
          style={[
            styles.completeButton,
            isStepCompleted && styles.completedButton,
          ]}
          labelStyle={styles.buttonLabel}
          icon={isStepCompleted ? 'check' : 'chevron-right'}
        >
          {isStepCompleted ? 'Done' : 'Next'}
        </Button>
        {currentStepIndex === allSteps.length - 1 && (
          <Button
            mode="contained"
            onPress={handleFinish}
            style={styles.finishButton}
            labelStyle={styles.buttonLabel}
            icon="check-circle"
          >
            Finish
          </Button>
        )}
      </View>
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
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.darkSurface,
    marginBottom: 12,
  },
  stepCounter: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  stepCard: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.orange,
    borderWidth: 2,
    borderRadius: 4,
    padding: 20,
    marginBottom: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepEmoji: {
    fontSize: 40,
    marginRight: 12,
  },
  stepRecipe: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.orange,
    letterSpacing: 0.5,
  },
  stepText: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 24,
    fontWeight: '500',
  },
  upcomingSteps: {
    marginBottom: 30,
  },
  upcomingTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  upcomingCard: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  upcomingText: {
    fontSize: 13,
    color: colors.white,
    marginBottom: 4,
  },
  upcomingRecipe: {
    fontSize: 11,
    color: colors.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  navButton: {
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 4,
    minWidth: 60,
  },
  completeButton: {
    flex: 1,
    backgroundColor: colors.orange,
    borderRadius: 4,
  },
  completedButton: {
    backgroundColor: colors.green,
  },
  finishButton: {
    flex: 1,
    backgroundColor: colors.green,
    borderRadius: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default CookModeScreen;