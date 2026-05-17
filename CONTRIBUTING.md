# Contributing to MealForge

We ❤️ contributions! Here's how to get started.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gym-meal-prep.git
   cd gym-meal-prep
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development**
   ```bash
   npm start
   ```

## Development Workflow

### File Structure
```
src/
├── screens/       # Screen components
├── context/       # React Context providers
├── navigation/    # Navigation setup
├── types/         # TypeScript definitions
└── theme/         # Theme and colors
```

### Adding a New Feature

1. **Create feature branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Add your code**
   - Follow TypeScript best practices
   - Use Material Design 3 components from React Native Paper
   - Match existing code style

3. **Test locally**
   ```bash
   npm start
   # Test on iOS/Android/Web
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: Add feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/feature-name
   # Create pull request on GitHub
   ```

## Commit Message Format

Use conventional commits:

```
type(scope): description

Optional body with more details.
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, missing semicolons)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Dependency updates

**Examples:**
```
feat(recipe): Add ability to import recipes
fix(navigation): Fix tab navigation not updating
docs: Update installation instructions
refactor(context): Simplify MealPlanContext
```

## Code Style

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Use type annotations
- Avoid `any`

### Components
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colors } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button mode="contained" onPress={onPress}>
        Press Me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default MyComponent;
```

### Theme Colors
Always use colors from `src/theme/index.ts`:
```typescript
import { colors } from '../theme';

// Use like this:
color={colors.orange}
```

## Testing

### Manual Testing
1. Test on both iOS simulator and Android emulator
2. Test on physical devices if possible
3. Test all navigation flows
4. Test edge cases (empty lists, etc.)

### What to Test
- Navigation works correctly
- Data persists after app restart
- UI looks good on different screen sizes
- No console errors or warnings

## Pull Request Guidelines

1. **Clear title**: Describe what changed
2. **Detailed description**: Why the change was made
3. **Link issues**: Reference related issues
4. **Screenshots**: Show UI changes
5. **Testing**: Explain how to test

**Example PR Description:**
```markdown
## What's Changed
Added ability to edit recipes after creation.

## Why
Users requested the ability to fix mistakes in recipes without deleting and recreating them.

## How to Test
1. Open Recipe Locker
2. Long-press a recipe
3. Select "Edit"
4. Modify recipe details
5. Verify changes are saved

## Screenshots
[Add before/after screenshots]

Closes #123
```

## Documentation

Update these files when relevant:
- `README.md` - User-facing features
- `DEPLOYMENT.md` - Deployment changes
- Code comments - Complex logic
- TypeScript types - Data structures

## Performance

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Optimize lists with FlatList
- Profile with React Profiler

## Accessibility

- Use proper labels and alt text
- Ensure touch targets are 44pt minimum
- Support screen readers
- Test with accessibility inspector

## Questions?

- Check existing issues and discussions
- Ask in GitHub Discussions
- Email: jameswetewart2304@gmail.com

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Celebrated in our community

Thank you for contributing! 🙌
