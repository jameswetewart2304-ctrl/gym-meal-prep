import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors } from '../theme';

const BatchCookPortionsScreen: React.FC<any> = ({ navigation }) => {
  const [portions, setPortions] = useState(1);

  const handleIncrease = () => {
    if (portions < 14) setPortions(portions + 1);
  };

  const handleDecrease = () => {
    if (portions > 1) setPortions(portions - 1);
  };

  const handleNext = () => {
    navigation.navigate('BatchCookPlan', { portions });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Set Your Portions</Text>
        <Text style={styles.subtitle}>
          We'll scale the shopping list to match your targets.
        </Text>
      </View>

      <View style={styles.portionControl}>
        <View style={styles.displayBox}>
          <Text style={styles.portionNumber}>{portions}</Text>
          <Text style={styles.portionLabel}>Portions</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleDecrease}
            disabled={portions === 1}
            style={styles.stepButton}
            labelStyle={styles.stepLabel}
          >
            −
          </Button>
          <Button
            mode="contained"
            onPress={handleIncrease}
            disabled={portions === 14}
            style={styles.stepButton}
            labelStyle={styles.stepLabel}
          >
            +
          </Button>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Portions are scaled individually per recipe. More portions = more of each ingredient on your shopping list.
        </Text>
      </View>

      <View style={styles.spacer} />

      <Button
        mode="contained"
        onPress={handleNext}
        style={styles.nextButton}
        labelStyle={styles.nextLabel}
        icon="arrow-right"
      >
        Generate Plan
      </Button>
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
    flexGrow: 1,
  },
  header: {
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  portionControl: {
    alignItems: 'center',
    marginBottom: 40,
  },
  displayBox: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.orange,
    borderWidth: 2,
    borderRadius: 4,
    paddingVertical: 40,
    paddingHorizontal: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  portionNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.orange,
  },
  portionLabel: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stepButton: {
    backgroundColor: colors.orange,
    minWidth: 60,
    borderRadius: 4,
  },
  stepLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
  },
  info: {
    backgroundColor: colors.darkSurface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
  },
  spacer: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: colors.orange,
    paddingVertical: 8,
    borderRadius: 4,
  },
  nextLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default BatchCookPortionsScreen;