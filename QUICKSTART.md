# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone the Repository
```bash
git clone https://github.com/jameswetewart2304-ctrl/gym-meal-prep.git
cd gym-meal-prep
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the App
```bash
npm start
```

### Step 4: Run on Device/Emulator

**Option A: iOS Simulator** (macOS only)
```bash
npm run ios
```

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: Physical Device**
- Install Expo Go from App Store or Google Play
- Scan the QR code displayed in terminal
- Opens automatically in Expo Go

**Option D: Web Browser**
```bash
npm run web
```

---

## 📱 What You'll See

### Home Screen (Batch Cook Tab)
- Recipe statistics
- Quick links to Recipe Locker
- "Batch Cook This Week" button

### Recipe Locker (Recipes Tab)
- Browse recipes by category
- Add new recipes
- Delete recipes
- View nutrition info

### Workflow

1. **Add Recipes**
   - Tap "Add Recipe" button
   - Fill in name, ingredients, steps
   - Add nutrition info
   - Select category (Pre-Workout, Meal, Refuel)

2. **Generate Plan**
   - Tap "Batch Cook This Week"
   - Set portions (1-14)
   - Let MealForge auto-generate your plan
   - Swap recipes as needed

3. **Get Shopping List**
   - View organized shopping list
   - Check off items as you shop
   - Share list with friends

4. **Cook Mode**
   - Step-by-step recipe guidance
   - Progress tracking
   - Upcoming steps preview

---

## 🛠️ Requirements

- **Node.js** 16+ ([Download](https://nodejs.org))
- **npm** (comes with Node)
- **Expo CLI** (optional, but recommended)
  ```bash
  npm install -g expo-cli
  ```

### For iOS Development
- macOS computer
- Xcode (free from App Store)
- iOS Simulator comes with Xcode

### For Android Development
- Android Studio (free)
- Android Emulator configured
- Android SDK 21+

---

## 💡 Tips

### Development
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Use tunnel mode (works without WiFi)
npm start -- --tunnel

# Debug in Chrome
npm start
# Then press 'j' in CLI
```

### Common Issues

**"Cannot find module"**
```bash
rm -rf node_modules
npm install
```

**Port 8081 already in use**
```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9
```

**Emulator won't connect**
- Make sure device is on same WiFi
- Try: `npm start -- --tunnel`
- Restart emulator/simulator

---

## 📄 File Structure

```
gym-meal-prep/
├── src/
│   ├── screens/          # App screens
│   ├── context/          # State management
│   ├── navigation/       # Navigation setup
│   ├── types/            # TypeScript types
│   └── theme/            # Colors & styles
├── assets/            # Icons, images
├── App.tsx            # Main app component
├── app.json           # Expo config
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
├── README.md          # Project overview
├── DEPLOYMENT.md      # Deployment guide
├── CONTRIBUTING.md    # Contributing guide
└── QUICKSTART.md      # This file
```

---

## 🔗 Useful Links

- **Expo Documentation**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **React Native Paper**: https://callstack.github.io/react-native-paper
- **Expo Snack** (online editor): https://snack.expo.dev

---

## 📞 Need Help?

1. **Check the docs**
   - README.md - Project overview
   - DEPLOYMENT.md - Deployment guide
   - CONTRIBUTING.md - Contributing guide

2. **Debugging**
   - Check console for errors
   - Use Chrome DevTools (press 'j' during npm start)
   - Check AsyncStorage data

3. **Troubleshooting**
   - Restart: `npm start`
   - Clear cache: `expo r -c`
   - Clear node_modules: `rm -rf node_modules && npm install`

4. **Ask for Help**
   - GitHub Issues: Create an issue
   - Email: jameswetewart2304@gmail.com

---

## 🎉 Next Steps

1. ✅ Clone and install dependencies
2. ✅ Run the app locally
3. ✅ Add some test recipes
4. ✅ Generate a meal plan
5. ✅ Try Cook Mode
6. ✅ Deploy when ready!

**Happy coding! 💪**