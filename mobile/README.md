# NNIT AI Enterprise Mobile

React Native Expo mobile application for iOS and Android.

## Features

- **Native Mobile Experience**: Built with Expo for iOS and Android
- **All AI Tools**: Access to Text, Code, Image, Audio, and Video AI
- **Camera Integration**: Capture images and videos directly
- **QR Scanner**: Scan certificates and codes
- **Offline Support**: AsyncStorage for offline-first functionality
- **Push Notifications**: Real-time updates
- **Dark Mode**: System-aware dark mode

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development:
```bash
npx expo start
```

4. Run on device:
- Scan QR code with Expo Go app (iOS/Android)
- Press `a` for Android emulator
- Press `i` for iOS simulator

## Building

### Development Build
```bash
eas build --profile development --platform android
```

### Production Build
```bash
eas build --profile production --platform all
```

## Testing

```bash
npm test
```

## Project Structure

```
src/
├── screens/        # Screen components
├── components/     # Reusable components
├── services/       # API and auth services
├── navigation/     # Navigation configuration
└── assets/         # Images, fonts, etc.
```

## License

MIT License - See LICENSE file for details.
