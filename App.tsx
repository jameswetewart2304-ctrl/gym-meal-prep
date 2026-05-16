import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecipeProvider } from './src/context/RecipeContext';
import { MealPlanProvider } from './src/context/MealPlanContext';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <RecipeProvider>
          <MealPlanProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
          </MealPlanProvider>
        </RecipeProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}