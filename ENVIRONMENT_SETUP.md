# Environment Setup Guide

## System Requirements

### All Platforms
- **Node.js**: 16.x or higher
- **npm**: 8.x or higher (comes with Node)
- **Git**: Latest version
- **RAM**: 4GB minimum (8GB+ recommended)
- **Disk Space**: 2GB free

### macOS (for iOS development)
- **OS**: macOS 12 or later
- **Xcode**: 14.0 or later (free from App Store)
- **Xcode Command Line Tools**: Included with Xcode

### Windows (for Android development)
- **Windows**: 10 or later
- **Android Studio**: Latest version (free)
- **Java**: 11 or later (included with Android Studio)

### Linux (for Android development)
- **Android Studio**: Latest version
- **Java**: 11 or later

---

## Installation Steps

### 1. Install Node.js

**macOS**
```bash
brew install node
```

**Windows** - Download from https://nodejs.org

**Linux**
```bash
sudo apt-get install nodejs npm
```

### 2. Verify Installation

```bash
node --version
npm --version
```

### 3. Install Expo CLI

```bash
npm install -g expo-cli
```

### 4. Clone Repository

```bash
git clone https://github.com/jameswetewart2304-ctrl/gym-meal-prep.git
cd gym-meal-prep
npm install
```

### 5. Start Development

```bash
npm start
```

---

## Running on Devices

### iOS Simulator (macOS)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Physical Device
1. Install Expo Go app
2. Run `npm start`
3. Scan QR code

### Web
```bash
npm run web
```

---

## Troubleshooting

**Port already in use**
```bash
lsof -ti:8081 | xargs kill -9
```

**Clear cache**
```bash
rm -rf node_modules && npm install
```

**Connection issues**
```bash
npm start -- --tunnel
```

---

## Support

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **GitHub**: https://github.com/jameswetewart2304-ctrl/gym-meal-prep