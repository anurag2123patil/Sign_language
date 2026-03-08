import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';

const NumbersModule = ({ navigation }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);

  // Marathi numbers with sign language descriptions
  const marathiNumbers = [
    { number: '१', pronunciation: 'ek', meaning: 'एक', signDescription: 'Index finger pointing up' },
    { number: '२', pronunciation: 'don', meaning: 'दोन', signDescription: 'Index and middle finger extended' },
    { number: '३', pronunciation: 'teen', meaning: 'तीन', signDescription: 'Three fingers extended' },
    { number: '४', pronunciation: 'char', meaning: 'चार', signDescription: 'Four fingers extended' },
    { number: '५', pronunciation: 'pach', meaning: 'पाच', signDescription: 'Open palm with all fingers' },
    { number: '६', pronunciation: 'saha', meaning: 'सहा', signDescription: 'Thumb and pinky extended' },
    { number: '७', pronunciation: 'sat', meaning: 'सात', signDescription: 'Fingers forming 7 shape' },
    { number: '८', pronunciation: 'aath', meaning: 'आठ', signDescription: 'Fingers forming 8 shape' },
    { number: '९', pronunciation: 'nau', meaning: 'नऊ', signDescription: 'Fingers forming 9 shape' },
    { number: '१०', pronunciation: 'daha', meaning: 'दहा', signDescription: 'Two open palms' },
  ];

  const nextNumber = () => {
    if (currentNumber < marathiNumbers.length - 1) {
      setCurrentNumber(currentNumber + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed all numbers!');
    }
  };

  const previousNumber = () => {
    if (currentNumber > 0) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const startPractice = () => {
    setPracticeMode(true);
  };

  const renderNumberCard = () => {
    const number = marathiNumbers[currentNumber];
    
    return (
      <View style={styles.numberCard}>
        <Text style={styles.numberDisplay}>{number.number}</Text>
        <View style={styles.numberInfo}>
          <Text style={styles.pronunciation}>Pronunciation: {number.pronunciation}</Text>
          <Text style={styles.meaning}>Meaning: {number.meaning}</Text>
          <Text style={styles.signDescription}>Sign: {number.signDescription}</Text>
        </View>
        
        {/* Placeholder for sign language video */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>📹 Sign Language Video</Text>
          <Text style={styles.videoSubtext}>Video demonstration will be shown here</Text>
        </View>
      </View>
    );
  };

  const renderPracticeMode = () => {
    const number = marathiNumbers[currentNumber];
    
    return (
      <View style={styles.practiceContainer}>
        <Text style={styles.practiceTitle}>Practice Mode</Text>
        <Text style={styles.practiceNumber}>{number.number}</Text>
        
        <View style={styles.practiceOptions}>
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>✍️ Writing Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>🔢 Counting Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>🎯 Recognition Test</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.exitPracticeButton}
          onPress={() => setPracticeMode(false)}
        >
          <Text style={styles.exitPracticeText}>Exit Practice</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCountingExercise = () => {
    return (
      <View style={styles.countingExercise}>
        <Text style={styles.exerciseTitle}>Counting Exercise</Text>
        <View style={styles.countingGrid}>
          {Array.from({ length: 10 }, (_, i) => (
            <TouchableOpacity key={i} style={styles.countingItem}>
              <Text style={styles.countingNumber}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marathi Numbers</Text>
        <Text style={styles.subtitle}>Learn Counting with Sign Language</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentNumber + 1} of {marathiNumbers.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentNumber + 1) / marathiNumbers.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {practiceMode ? renderPracticeMode() : renderNumberCard()}

      {!practiceMode && (
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentNumber === 0 && styles.disabledButton]}
            onPress={previousNumber}
            disabled={currentNumber === 0}
          >
            <Text style={styles.controlButtonText}>← Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceModeButton} onPress={startPractice}>
            <Text style={styles.practiceModeText}>🎯 Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentNumber === marathiNumbers.length - 1 && styles.disabledButton]}
            onPress={nextNumber}
            disabled={currentNumber === marathiNumbers.length - 1}
          >
            <Text style={styles.controlButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>
      )}

      {renderCountingExercise()}

      <View style={styles.numberList}>
        <Text style={styles.listTitle}>All Numbers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {marathiNumbers.map((number, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.numberItem,
                index === currentNumber && styles.activeNumberItem
              ]}
              onPress={() => setCurrentNumber(index)}
            >
              <Text style={[
                styles.numberItemText,
                index === currentNumber && styles.activeNumberItemText
              ]}>
                {number.number}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.number,
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white + 'CC',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.number,
    borderRadius: 2,
  },
  numberCard: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  numberDisplay: {
    fontSize: 120,
    fontWeight: 'bold',
    color: Colors.number,
    marginBottom: 16,
  },
  numberInfo: {
    width: '100%',
    marginBottom: 24,
  },
  englishNumber: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  pronunciation: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  meaning: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  signDescription: {
    fontSize: 14,
    color: Colors.textHint,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.grayLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  videoText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  videoSubtext: {
    fontSize: 14,
    color: Colors.textHint,
  },
  practiceContainer: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  practiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  practiceNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: Colors.number,
    textAlign: 'center',
    marginBottom: 24,
  },
  practiceOptions: {
    marginBottom: 24,
  },
  practiceButton: {
    backgroundColor: Colors.number,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  practiceButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  exitPracticeButton: {
    backgroundColor: Colors.error,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitPracticeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  countingExercise: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  countingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countingItem: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: Colors.number + '20',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  countingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.number,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  controlButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  practiceModeButton: {
    backgroundColor: Colors.number,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  practiceModeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  numberList: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  numberItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeNumberItem: {
    backgroundColor: Colors.number,
  },
  numberItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  activeNumberItemText: {
    color: Colors.white,
  },
});

export default NumbersModule;
