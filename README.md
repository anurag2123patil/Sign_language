# Sign Language Education Mobile App

This is a React Native Expo mobile application for Sign Language Education designed for deaf and mute students in Maharashtra. This is a standalone frontend application with offline learning capabilities.

## Features

### 👩‍🎓 Learning Modules
- **Alphabets & Numbers**: Marathi alphabets and numbers with sign language
- **Words & Sentences**: Flashcards and sign animations
- **Mathematics**: Math concepts with sign language
- **Science**: Basic science concepts with sign animations

### ✍️ Practice Tools
- **Writing Pad**: Canvas for writing Marathi words/sentences
- **Typing Practice**: Input validation and sign animation

### 📊 Other Features
- **Dashboard**: Overview of learning modules
- **Profile**: User profile management

## Technology Stack

- **React Native** with Expo
- **React Navigation** for navigation
- **AsyncStorage** for local data persistence
- **React Native Canvas** for writing pad
- **React Native Chart Kit** for analytics
- **Expo Vector Icons** for icons

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   └── student/       # Student learning screens
├── navigation/         # Navigation configuration
├── constants/         # App constants and configurations
└── utils/             # Utility functions
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on device/emulator:
```bash
# Android
npm run android

# iOS (requires macOS)
npm run ios

# Web
npm run web
```

## Key Components

### Student Dashboard
- `StudentDashboard`: Main student interface with learning modules
- `PracticeScreen`: Access to writing and typing practice
- `ProfileScreen`: User profile screen

### Learning Modules
- `AlphabetsModule`: Marathi alphabets with sign language
- `NumbersModule`: Numbers with sign language
- `WordsModule`: Words flashcards
- `SentencesModule`: Sentence practice
- `MathModule`: Mathematics concepts
- `ScienceModule`: Science concepts

### Navigation
- `AppNavigator`: Main app navigation
- `StudentNavigator`: Student-specific navigation with bottom tabs

## Development Status

### ✅ Completed
- Project setup and configuration
- Student dashboard and navigation
- Learning modules (Alphabets, Numbers, Words, Sentences, Math, Science)
- Writing pad implementation
- Typing practice functionality
- Offline support (standalone app)

### 📋 Planned
- Advanced practice features
- Progress tracking
- Multi-language support enhancements
- Accessibility features improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
