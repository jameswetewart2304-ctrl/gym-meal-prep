# MealForge 🏋️ 💪

> **Fuel the Machine. Meal Prep Like a Beast.**

A React Native Expo app that revolutionizes meal prep for gym enthusiasts. Plan your week, generate smart shopping lists, and cook like a champion with step-by-step guidance.

## Features

✨ **Recipe Locker** - Organize recipes by category (Pre-Workout, Meals, Refuel)
⚡ **Smart Batch Cook** - AI-assisted weekly meal planning with auto-generated shopping lists
📱 **Cook Mode** - Step-by-step recipe guidance with progress tracking
📊 **Nutrition Tracking** - Monitor calories, protein, carbs, and fats
🛒 **Shopping Lists** - Organized by category with batch quantities
💾 **Local Storage** - All data persists locally on device

## Quick Start

### Prerequisites
- Node.js 16+
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
git clone https://github.com/jameswetewart2304-ctrl/gym-meal-prep.git
cd gym-meal-prep
npm install
```

### Running the App

```bash
npm start

# Then press:
# i - iOS simulator
# a - Android emulator
# w - Web browser
```

## Project Structure

```
src/
├── screens/              # App screens
│   ├── HomeScreen
│   ├── RecipeLockerScreen
│   ├── AddRecipeScreen
│   ├── BatchCookPortionsScreen
│   ├── BatchCookPlanScreen
│   ├── ShoppingListScreen
│   └── CookModeScreen
├── context/              # React Context for state
│   ├── RecipeContext
│   └── MealPlanContext
├── navigation/           # Navigation setup
│   └── RootNavigator
├── types/               # TypeScript definitions
├── theme/              # Material Design 3 dark theme
App.tsx                 # App entry point
```

## How It Works

### 1. Build Your Recipe Locker
Start by adding recipes to your locker. Categorize them as:
- ⚡ Pre-Workout (energy boost before training)
- 🍖 Meals (main meals)
- 💪 Refuel (post-workout recovery)

### 2. Generate Weekly Plan
Specify your portions and let MealForge:
- Randomly select recipes from your locker
- Generate a complete weekly meal plan
- Calculate nutrition totals

### 3. Create Shopping List
Automatic shopping list generation with:
- Scaled quantities based on portions
- Items organized by category (Produce, Proteins, Dairy, Pantry)
- Multiplier tracking for batch cooking

### 4. Cook Mode
Step-by-step cooking guidance:
- Visual progress tracking
- Upcoming steps preview
- Mark steps as complete
- Built for the kitchen (large text, clear instructions)

## Tech Stack

- **Framework**: React Native with Expo
- **UI Library**: React Native Paper (Material Design 3)
- **Navigation**: React Navigation (bottom tabs + stack)
- **State**: React Context API
- **Storage**: AsyncStorage (local)
- **Language**: TypeScript

## Data Models

### Recipe
```typescript
{
  id: string
  name: string
  category: 'pre-workout' | 'meal' | 'refuel'
  ingredients: Ingredient[]
  steps: string[]
  nutritionInfo: {
    calories: number
    protein: number
    carbs: number
    fats: number
  }
  emoji: string
  createdAt: string
}
```

### WeeklyMealPlan
```typescript
{
  id: string
  portions: number
  meals: {
    preWorkout: Recipe
    meals: Recipe[]
    refuel: Recipe
  }
  createdAt: string
}
```

## Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Push and open a PR

## License

MIT © James Wetewart

## Support

For issues or feature requests, open a GitHub issue.

---

**Built for gym enthusiasts by gym enthusiasts. Train hard, eat smart.** 💪🍽️