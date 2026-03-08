import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';

const PracticeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <Text style={styles.subtitle}>Choose your practice type</Text>
      
      <TouchableOpacity
        style={[styles.practiceCard, { backgroundColor: Colors.writing }]}
        onPress={() => navigation.navigate('WritingPractice')}
      >
        <Text style={styles.practiceIcon}>✍️</Text>
        <Text style={styles.practiceTitle}>Writing Practice</Text>
        <Text style={styles.practiceDescription}>Practice writing Marathi words and sentences</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.practiceCard, { backgroundColor: Colors.typing }]}
        onPress={() => navigation.navigate('TypingPractice')}
      >
        <Text style={styles.practiceIcon}>⌨️</Text>
        <Text style={styles.practiceTitle}>Typing Practice</Text>
        <Text style={styles.practiceDescription}>Improve your typing speed and accuracy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  practiceCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  practiceIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  practiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  practiceDescription: {
    fontSize: 14,
    color: Colors.white + 'CC',
    textAlign: 'center',
  },
});

export default PracticeScreen;
