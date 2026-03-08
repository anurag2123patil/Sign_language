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

const MathModule = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const mathQuestions = [
    {
      question: '२ + ३ = ?',
      options: ['४', '५', '६', '७'],
      correct: 1,
      explanation: '२ + ३ = ५ (2 + 3 = 5)'
    },
    {
      question: '५ - २ = ?',
      options: ['२', '३', '४', '५'],
      correct: 1,
      explanation: '५ - २ = ३ (5 - 2 = 3)'
    },
    {
      question: '२ × ४ = ?',
      options: ['६', '७', '८', '९'],
      correct: 2,
      explanation: '२ × ४ = ८ (2 × 4 = 8)'
    },
    {
      question: '१० ÷ २ = ?',
      options: ['३', '४', '५', '६'],
      correct: 2,
      explanation: '१० ÷ २ = ५ (10 ÷ 2 = 5)'
    },
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === mathQuestions[currentQuestion].correct) {
      setScore(score + 1);
      Alert.alert('Correct!', mathQuestions[currentQuestion].explanation);
    } else {
      Alert.alert('Incorrect!', mathQuestions[currentQuestion].explanation);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      Alert.alert('Quiz Complete!', `Your score: ${score + (selectedAnswer === mathQuestions[currentQuestion].correct ? 1 : 0)}/${mathQuestions.length}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mathematics</Text>
        <Text style={styles.subtitle}>Practice Math with Sign Language</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1} of {mathQuestions.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / mathQuestions.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{mathQuestions[currentQuestion].question}</Text>
        
        <View style={styles.optionsContainer}>
          {mathQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                selectedAnswer !== null && index === mathQuestions[currentQuestion].correct && styles.correctOption,
                selectedAnswer !== null && index !== mathQuestions[currentQuestion].correct && selectedAnswer === index && styles.incorrectOption
              ]}
              onPress={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText,
                selectedAnswer !== null && index === mathQuestions[currentQuestion].correct && styles.correctOptionText,
                selectedAnswer !== null && index !== mathQuestions[currentQuestion].correct && selectedAnswer === index && styles.incorrectOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedAnswer !== null && (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationText}>
            {mathQuestions[currentQuestion].explanation}
          </Text>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, selectedAnswer === null && styles.disabledButton]}
          onPress={nextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.controlButtonText}>
            {currentQuestion === mathQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.math,
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
    backgroundColor: Colors.math,
    borderRadius: 2,
  },
  questionCard: {
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
  questionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: Colors.grayLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  correctOption: {
    backgroundColor: Colors.success,
  },
  incorrectOption: {
    backgroundColor: Colors.error,
  },
  optionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.white,
  },
  correctOptionText: {
    color: Colors.white,
  },
  incorrectOptionText: {
    color: Colors.white,
  },
  explanationCard: {
    margin: 16,
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
    padding: 16,
  },
  explanationText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  controls: {
    padding: 16,
  },
  controlButton: {
    backgroundColor: Colors.math,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MathModule;
