import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';

const SentencesModule = ({ navigation }) => {
  const [currentSentence, setCurrentSentence] = useState(0);

  const marathiSentences = [
    { 
      sentence: 'माझे नाव अनुराग आहे।', 
      meaning: 'स्वतःची ओळख करून देणे',
      category: 'Introduction'
    },
    { 
      sentence: 'तुम्ही कसे आहात?', 
      meaning: 'कुशलक्षेम विचारणे',
      category: 'Greeting'
    },
    { 
      sentence: 'मला मदत करा।', 
      meaning: 'मदतीची विनंती',
      category: 'Request'
    },
    { 
      sentence: 'धन्यवाद।', 
      meaning: 'कृतज्ञता व्यक्त करणे',
      category: 'Gratitude'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marathi Sentences</Text>
        <Text style={styles.subtitle}>Form Conversations with Sign Language</Text>
      </View>

      <View style={styles.sentenceCard}>
        <Text style={styles.category}>{marathiSentences[currentSentence].category}</Text>
        <Text style={styles.sentence}>{marathiSentences[currentSentence].sentence}</Text>
        <Text style={styles.meaning}>{marathiSentences[currentSentence].meaning}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentSentence === 0 && styles.disabledButton]}
          onPress={() => setCurrentSentence(Math.max(0, currentSentence - 1))}
          disabled={currentSentence === 0}
        >
          <Text style={styles.controlButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, currentSentence === marathiSentences.length - 1 && styles.disabledButton]}
          onPress={() => setCurrentSentence(Math.min(marathiSentences.length - 1, currentSentence + 1))}
          disabled={currentSentence === marathiSentences.length - 1}
        >
          <Text style={styles.controlButtonText}>Next →</Text>
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
    backgroundColor: Colors.sentence,
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
  sentenceCard: {
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
  category: {
    fontSize: 12,
    color: Colors.sentence,
    backgroundColor: Colors.sentence + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  sentence: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  // english removed
  meaning: {
    fontSize: 16,
    color: Colors.textHint,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default SentencesModule;
