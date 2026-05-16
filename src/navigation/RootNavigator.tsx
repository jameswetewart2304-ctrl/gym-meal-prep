import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RecipeLockerScreen from '../screens/RecipeLockerScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import BatchCookPortionsScreen from '../screens/BatchCookPortionsScreen';
import BatchCookPlanScreen from '../screens/BatchCookPlanScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import CookModeScreen from '../screens/CookModeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: colors.dark },
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="BatchCookPortions" component={BatchCookPortionsScreen} />
    <Stack.Screen name="BatchCookPlan" component={BatchCookPlanScreen} />
    <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
    <Stack.Screen name="CookMode" component={CookModeScreen} />
  </Stack.Navigator>
);

const RecipeStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="RecipeLocker" component={RecipeLockerScreen} />
    <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.darkSurface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'lightning-bolt';
          if (route.name === 'Recipes') iconName = 'book-open';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Batch Cook' }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipeStack}
        options={{ tabBarLabel: 'Recipe Locker' }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;