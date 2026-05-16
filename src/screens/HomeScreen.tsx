import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useRecipes } from '../context/RecipeContext';
import { colors } from '../theme';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { recipes, isLoading } = useRecipes();

  const preWorkoutCount = recipes.filter(r => r.category === 'pre-workout').length;
  const mealsCount = recipes.filter(r => r.category === 'meal').length;
  const refuelsCount = recipes.filter(r => r.category === 'refuel').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <Text style={styles.mainHeading}>Fuel the Machine</Text>
        <Text style={styles.subHeading}>Meal Prep Like a Beast</Text>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pre-Workout</Text>
          <Text style={styles.statValue}>{preWorkoutCount}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Meals</Text>
          <Text style={styles.statValue}>{mealsCount}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Refuels</Text>
          <Text style={styles.statValue}>{refuelsCount}</Text>
        </View>
      </View>

      {/* CTAs */}
      <View style={styles.ctaContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Recipes')}
          style={styles.ctaButton}
          labelStyle={styles.ctaLabel}
          icon="book-open"
        >
          Recipe Locker
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('BatchCookPortions')}
          style={styles.ctaButton}
          labelStyle={styles.ctaLabel}
          icon="lightning-bolt"
        >
          Batch Cook This Week
        </Button>
      </View>

      {/* Info Card */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>1. Build your recipe locker{`\n`}2. Set your portions{`\n`}3. Let MealForge generate your weekly plan{`\n`}4. Cook like a champion</Text>
        </Card.Content>
      </Card>
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
    marginBottom: 30,
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.orange,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 8,
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.orange,
  },
  ctaContainer: {
    gap: 12,
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: colors.orange,
    borderRadius: 4,
    paddingVertical: 8,
  },
  ctaLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoCard: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 40,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 22,
  },
});

export default HomeScreen;