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
- **Additional packages**: See Android Studio documentation

---

## Installation Steps

### 1. Install Node.js

**macOS**
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org
```

**Windows**
- Download from https://nodejs.org
- Run the installer
- Accept all defaults

**Linux**
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### 2. Verify Installation

```bash
node --version    # Should be 16.x or higher
npm --version     # Should be 8.x or higher
```

### 3. Install Expo CLI (Recommended)

```bash
npm install -g expo-cli
expo --version
```

### 4. Setup iOS Development (macOS only)

```bash
# Install Xcode from App Store
# Or from https://developer.apple.com/download/

# Install command line tools
sudo xcode-select --install

# Verify installation
xcodebuild -version
```

### 5. Setup Android Development

#### macOS/Linux
```bash
# Download Android Studio from:
# https://developer.android.com/studio

# After installation, run:
android_sdk_root=/Users/username/Library/Android/sdk
export ANDROID_HOME=$android_sdk_root
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools

# Add to ~/.zshrc or ~/.bash_profile for persistence
echo 'export ANDROID_HOME=~/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

#### Windows
1. Download Android Studio from https://developer.android.com/studio
2. Run installer
3. Accept all licenses
4. Set ANDROID_HOME environment variable:
   - Right-click "This PC" → Properties
   - Advanced system settings
   - Environment variables
   - Add new system variable:
     - Name: `ANDROID_HOME`
     - Value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`

### 6. Create Android Emulator

```bash
# Open Android Studio
# Go to: Tools → Device Manager → Create Virtual Device
# Select device (e.g., Pixel 4)
# Select API level (minimum 21)
# Finish

# Or via command line:
emulator -avd YourDeviceName
```

---

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/jameswetewart2304-ctrl/gym-meal-prep.git
cd gym-meal-prep
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Setup

```bash
# Check all dependencies are installed
npm list react-native
npm list expo

# Test Expo
expo --version
```

---

## Development Environment Setup

### VSCode Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Publisher: dsznajder.es7-react-js-snippets

2. **React Native Tools**
   - Publisher: msjsdiag.vscode-react-native

3. **TypeScript Vue Plugin**
   - Publisher: Vue

4. **Prettier - Code formatter**
   - Publisher: Prettier

5. **ESLint**
   - Publisher: Microsoft

### VSCode Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]" : {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]" : {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]" : {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Environment Variables

### Create .env File

```bash
cd gym-meal-prep
touch .env
```

Edit `.env`:

```env
# Expo Configuration
EXPO_DEBUG=false
EXPO_NO_TELEMETRY=false

# API Configuration (if needed)
API_URL=https://api.example.com
API_KEY=your_api_key_here
```

**Note**: `.env` is not committed to git (see `.gitignore`)

---

## Running the App

### Start Development Server

```bash
npm start
```

### Run on iOS Simulator (macOS)

```bash
npm run ios
```

### Run on Android Emulator

```bash
npm run android
```

### Run on Physical Device

1. Install Expo Go:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Run `npm start`
3. Scan QR code with device camera
4. Opens in Expo Go automatically

### Run on Web

```bash
npm run web
```

---

## Troubleshooting

### Node/npm Issues

```bash
# Check installation
which node
which npm

# Update npm
npm install -g npm@latest

# Clear npm cache
npm cache clean --force
```

### Expo Issues

```bash
# Reinstall Expo CLI
npm uninstall -g expo-cli
npm install -g expo-cli

# Login to Expo
expo login

# Check Expo status
expo whoami
```

### Port Already in Use

```bash
# macOS/Linux - Find process on port 8081
lsof -ti:8081 | xargs kill -9

# Windows - Find process on port 8081
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

### Permission Errors

```bash
# Don't use sudo with npm
# Instead, fix permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### iOS Simulator Issues

```bash
# Reset simulator
sudo xcrun simctl erase all

# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot <device-id>
```

### Android Emulator Issues

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd <device-name>

# Kill all emulators
killall qemu-system-x86_64
```

---

## Verify Everything Works

```bash
# 1. Navigate to project
cd gym-meal-prep

# 2. Install dependencies
npm install

# 3. Start app
npm start

# 4. Press 'i' for iOS or 'a' for Android
# 5. App should open in simulator/emulator
# 6. You should see the MealForge home screen
```

---

## Next Steps

1. Read QUICKSTART.md
2. Read README.md for project overview
3. Check DEPLOYMENT.md for deployment instructions
4. Start developing!

---

## Support

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Issue Tracker**: https://github.com/jameswetewart2304-ctrl/gym-meal-prep/issues
- **Email Support**: jameswetewart2304@gmail.com
