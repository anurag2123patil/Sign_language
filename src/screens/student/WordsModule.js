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

const WordsModule = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [flashcardMode, setFlashcardMode] = useState(false);

  // Marathi words with meanings and sign descriptions
  const marathiWords = [
    { 
      word: 'पाणी', 
      pronunciation: 'paani', 
      meaning: 'पिण्यासाठी शुद्ध द्रव',
      signDescription: 'Hand cupping water motion',
      category: 'Basic'
    },
    { 
      word: 'खानं', 
      pronunciation: 'khaana', 
      meaning: 'खाण्यासाठी पदार्थ',
      signDescription: 'Hand to mouth eating motion',
      category: 'Basic'
    },
    { 
      word: 'घर', 
      pronunciation: 'ghar', 
      meaning: 'आपण राहतो ते ठिकाण',
      signDescription: 'Hands forming roof shape',
      category: 'Basic'
    },
    { 
      word: 'पुस्तक', 
      pronunciation: 'pustak', 
      meaning: 'वाचण्यासाठी पानांचा संग्रह',
      signDescription: 'Hands opening like book',
      category: 'Education'
    },
    { 
      word: 'शाळा', 
      pronunciation: 'shaala', 
      meaning: 'शिक्षण घेण्याचे ठिकाण',
      signDescription: 'Building with flag motion',
      category: 'Education'
    },
    { 
      word: 'मित्र', 
      pronunciation: 'mitra', 
      meaning: 'जवळचा सोबती',
      signDescription: 'Handshake gesture',
      category: 'Social'
    },
  ];

  const nextWord = () => {
    if (currentWord < marathiWords.length - 1) {
      setCurrentWord(currentWord + 1);
    } else {
      Alert.alert('Congratulations!', 'You have completed all words!');
    }
  };

  const previousWord = () => {
    if (currentWord > 0) {
      setCurrentWord(currentWord - 1);
    }
  };

  const startPractice = () => {
    setPracticeMode(true);
    setFlashcardMode(false);
  };

  const startFlashcards = () => {
    setFlashcardMode(true);
    setPracticeMode(false);
  };

  const renderWordCard = () => {
    const word = marathiWords[currentWord];
    
    return (
      <View style={styles.wordCard}>
        <View style={styles.wordHeader}>
          <Text style={styles.wordCategory}>{word.category}</Text>
          <Text style={styles.wordText}>{word.word}</Text>
          {/* English removed */}
        </View>
        
        <View style={styles.wordInfo}>
          <Text style={styles.pronunciation}>Pronunciation: {word.pronunciation}</Text>
          <Text style={styles.meaning}>Meaning: {word.meaning}</Text>
          <Text style={styles.signDescription}>Sign: {word.signDescription}</Text>
        </View>
        
        {/* Placeholder for sign language video */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>📹 Sign Language Video</Text>
          <Text style={styles.videoSubtext}>Video demonstration will be shown here</Text>
        </View>
      </View>
    );
  };

  const renderFlashcard = () => {
    const word = marathiWords[currentWord];
    const [showAnswer, setShowAnswer] = useState(false);
    
    return (
      <View style={styles.flashcardContainer}>
        <Text style={styles.flashcardTitle}>Flashcard Mode</Text>
        
        <TouchableOpacity 
          style={styles.flashcard}
          onPress={() => setShowAnswer(!showAnswer)}
        >
          <Text style={styles.flashcardWord}>
            {showAnswer ? word.word : '?'}
          </Text>
          {showAnswer && (
            <View style={styles.flashcardAnswer}>
              {/* English removed */}
              <Text style={styles.flashcardMeaning}>{word.meaning}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <Text style={styles.flashcardHint}>
          Tap to {showAnswer ? 'hide' : 'show'} answer
        </Text>
        
        <View style={styles.flashcardControls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentWord === 0 && styles.disabledButton]}
            onPress={previousWord}
            disabled={currentWord === 0}
          >
            <Text style={styles.controlButtonText}>← Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentWord === marathiWords.length - 1 && styles.disabledButton]}
            onPress={nextWord}
            disabled={currentWord === marathiWords.length - 1}
          >
            <Text style={styles.controlButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.exitPracticeButton}
          onPress={() => setFlashcardMode(false)}
        >
          <Text style={styles.exitPracticeText}>Exit Flashcards</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPracticeMode = () => {
    return (
      <View style={styles.practiceContainer}>
        <Text style={styles.practiceTitle}>Practice Mode</Text>
        
        <View style={styles.practiceOptions}>
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>✍️ Writing Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>🎯 Recognition Test</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>🔊 Pronunciation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>🧩 Word Matching</Text>
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marathi Words</Text>
        <Text style={styles.subtitle}>Build Vocabulary with Sign Language</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentWord + 1} of {marathiWords.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentWord + 1) / marathiWords.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {flashcardMode ? renderFlashcard() : practiceMode ? renderPracticeMode() : renderWordCard()}

      {!practiceMode && !flashcardMode && (
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, currentWord === 0 && styles.disabledButton]}
            onPress={previousWord}
            disabled={currentWord === 0}
          >
            <Text style={styles.controlButtonText}>← Previous</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.flashcardButton} onPress={startFlashcards}>
            <Text style={styles.flashcardButtonText}>🃏 Flashcards</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.practiceModeButton} onPress={startPractice}>
            <Text style={styles.practiceModeText}>🎯 Practice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, currentWord === marathiWords.length - 1 && styles.disabledButton]}
            onPress={nextWord}
            disabled={currentWord === marathiWords.length - 1}
          >
            <Text style={styles.controlButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.wordList}>
        <Text style={styles.listTitle}>All Words</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {marathiWords.map((word, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.wordItem,
                index === currentWord && styles.activeWordItem
              ]}
              onPress={() => setCurrentWord(index)}
            >
              <Text style={[
                styles.wordItemText,
                index === currentWord && styles.activeWordItemText
              ]}>
                {word.word}
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
    backgroundColor: Colors.word,
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
    backgroundColor: Colors.word,
    borderRadius: 2,
  },
  wordCard: {
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
  wordHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wordCategory: {
    fontSize: 12,
    color: Colors.word,
    backgroundColor: Colors.word + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  wordText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.word,
    marginBottom: 8,
  },
  englishWord: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  wordInfo: {
    marginBottom: 24,
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
  flashcardContainer: {
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
  flashcardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  flashcard: {
    backgroundColor: Colors.word + '10',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 200,
    justifyContent: 'center',
  },
  flashcardWord: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Colors.word,
    marginBottom: 16,
  },
  flashcardAnswer: {
    alignItems: 'center',
  },
  flashcardEnglish: {
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  flashcardMeaning: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  flashcardHint: {
    fontSize: 14,
    color: Colors.textHint,
    textAlign: 'center',
    marginBottom: 20,
  },
  flashcardControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  practiceOptions: {
    marginBottom: 24,
  },
  practiceButton: {
    backgroundColor: Colors.word,
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    flexWrap: 'wrap',
  },
  controlButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  flashcardButton: {
    backgroundColor: Colors.sentence,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  flashcardButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  practiceModeButton: {
    backgroundColor: Colors.word,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  practiceModeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  wordList: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  wordItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    marginRight: 8,
  },
  activeWordItem: {
    backgroundColor: Colors.word,
  },
  wordItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeWordItemText: {
    color: Colors.white,
  },
});

export default WordsModule;
