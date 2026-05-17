# MealForge - Deployment Guide

## Table of Contents
1. [Local Development](#local-development)
2. [Testing on Device](#testing-on-device)
3. [Building for Production](#building-for-production)
4. [Publishing to Expo](#publishing-to-expo)
5. [Deploying to App Stores](#deploying-to-app-stores)

---

## Local Development

### Prerequisites
- **Node.js** 16 or higher
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Git**

### Setup

```bash
# Clone the repository
git clone https://github.com/jameswetewart2304-ctrl/gym-meal-prep.git
cd gym-meal-prep

# Install dependencies
npm install

# Start the development server
npm start
```

### Development Server Options

```bash
# Start with Expo CLI
npm start

# Then in the CLI, press:
# 'i' - iOS Simulator
# 'a' - Android Emulator  
# 'w' - Web Browser
# 'j' - Debug in Chrome
```

---

## Testing on Device

### iOS (Real Device)

1. Install Expo Go from App Store
2. Make sure device is on same WiFi as computer
3. Run: `npm start`
4. Scan QR code with camera app
5. Opens in Expo Go automatically

### Android (Real Device)

1. Install Expo Go from Google Play Store
2. Make sure device is on same WiFi as computer
3. Run: `npm start`
4. Tap "Scan QR code" in Expo Go
5. Scan the QR code from terminal

### iOS Simulator

```bash
# On macOS with Xcode installed
npm run ios
```

### Android Emulator

```bash
# Requires Android SDK/Emulator installed
npm run android
```

---

## Building for Production

### Create Expo Account

```bash
expo login
# Enter email and password
```

### Build APK/IPA

#### Android APK

```bash
eas build --platform android --build-type apk
```

#### iOS IPA

```bash
eas build --platform ios --build-type ipa
```

#### Both Platforms

```bash
eas build --platform all
```

### Monitor Build Status

```bash
# Check build status
eas build:list

# Watch build progress
eas build --platform android --watch
```

---

## Publishing to Expo

### Update Version

Edit `app.json`:

```json
{
  "expo": {
    "version": "1.1.0"
  }
}
```

### Publish Updates

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas update:configure

# Create update
eas update --message "Version 1.1.0 - New features"
```

### Users receive updates when they:
- Open the app
- The app checks for updates automatically
- Updates download silently and apply on next launch

---

## Deploying to App Stores

### Google Play Store

#### Prerequisites
- Google Play Developer Account ($25 one-time)
- Signed APK or AAB (Android App Bundle)

#### Steps

1. **Generate AAB**
   ```bash
   eas build --platform android --build-type app-bundle
   ```

2. **Go to Google Play Console**
   - https://play.google.com/console
   - Create new app
   - Fill in app details

3. **Upload Build**
   - Internal Testing → Upload AAB
   - Fill store listing details
   - Add screenshots, description, etc.

4. **Submit for Review**
   - Complete compliance questionnaire
   - Submit for review
   - Takes 2-4 hours typically

### Apple App Store

#### Prerequisites
- Apple Developer Account ($99/year)
- Mac with Xcode
- Apple ID with app manager role

#### Steps

1. **Create App ID**
   - Go to https://appstoreconnect.apple.com
   - My Apps → New App
   - Bundle ID: `com.jameswetewart.mealforge`

2. **Generate IPA**
   ```bash
   eas build --platform ios --build-type ipa
   ```

3. **Upload to App Store**
   ```bash
   eas submit --platform ios
   ```

4. **Fill Store Details**
   - App Description
   - Keywords
   - Screenshots (6 total: iPhone & iPad)
   - Privacy Policy
   - Support URL

5. **Submit for Review**
   - Apple Review takes 24-48 hours
   - May request changes

---

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install -g eas-cli
      - run: npm install
      - run: eas build --platform all --non-interactive
      - run: eas submit --platform all --non-interactive
```

---

## Environment Variables

Create `.env` (not committed):

```env
EXPO_TOKEN=your_expo_token_here
APPLE_ID=your_apple_id
APPLE_PASSWORD=your_app_password
```

Get Expo token:
```bash
expo login
cat ~/.expo/state.json | grep accessToken
```

---

## Troubleshooting

### Build Fails
- Clear cache: `npm install && expo prebuild --clean`
- Check Node version: `node --version` (should be 16+)
- Verify app.json is valid JSON

### Won't Connect to Device
- Ensure WiFi network allows local connections
- Try USB tunnel: `npm start -- --tunnel`
- Restart Expo Go app

### Stuck in Build
- Check status: `eas build:list`
- Cancel and retry: `eas build:cancel [BUILD_ID]`
- Contact Expo Support: https://expo.dev/support

---

## Useful Links

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Expo EAS**: https://eas.expo.dev
- **React Navigation**: https://reactnavigation.org
- **React Native Paper**: https://callstack.github.io/react-native-paper

---

## Support

For deployment issues:
1. Check Expo docs: https://docs.expo.dev/deployment
2. Search GitHub issues: https://github.com/expo/expo/issues
3. Ask in Expo Discord: https://discord.gg/expo
4. Contact Expo Support: https://expo.dev/support

