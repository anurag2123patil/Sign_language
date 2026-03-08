import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';

const ScienceModule = ({ navigation }) => {
  const [currentTopic, setCurrentTopic] = useState(0);

  const scienceTopics = [
    {
      title: 'Plants',
      marathiTitle: 'वनस्पती',
      concepts: [
        { name: 'Tree', marathi: 'झाड', description: 'Tall plant with trunk' },
        { name: 'Flower', marathi: 'फूल', description: 'Colorful part of plant' },
        { name: 'Leaf', marathi: 'पान', description: 'Green part of plant' },
      ]
    },
    {
      title: 'Animals',
      marathiTitle: 'प्राणी',
      concepts: [
        { name: 'Dog', marathi: 'कुत्रा', description: 'Faithful pet animal' },
        { name: 'Cat', marathi: 'मांजर', description: 'Small furry pet' },
        { name: 'Bird', marathi: 'पक्षी', description: 'Animal that can fly' },
      ]
    },
    {
      title: 'Weather',
      marathiTitle: 'हवामान',
      concepts: [
        { name: 'Sun', marathi: 'सूर्य', description: 'Bright star in sky' },
        { name: 'Rain', marathi: 'पाऊस', description: 'Water falling from clouds' },
        { name: 'Cloud', marathi: 'ढग', description: 'White or gray in sky' },
      ]
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Science</Text>
        <Text style={styles.subtitle}>Explore Science Concepts with Sign Language</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentTopic + 1} of {scienceTopics.length}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentTopic + 1) / scienceTopics.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.topicCard}>
        <Text style={styles.topicTitle}>{scienceTopics[currentTopic].title}</Text>
        <Text style={styles.topicMarathi}>{scienceTopics[currentTopic].marathiTitle}</Text>
        
        <View style={styles.conceptsContainer}>
          {scienceTopics[currentTopic].concepts.map((concept, index) => (
            <View key={index} style={styles.conceptItem}>
              <Text style={styles.conceptName}>{concept.name}</Text>
              <Text style={styles.conceptMarathi}>{concept.marathi}</Text>
              <Text style={styles.conceptDescription}>{concept.description}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>📹 Science Video</Text>
          <Text style={styles.videoSubtext}>Interactive science demonstration</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, currentTopic === 0 && styles.disabledButton]}
          onPress={() => setCurrentTopic(Math.max(0, currentTopic - 1))}
          disabled={currentTopic === 0}
        >
          <Text style={styles.controlButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.practiceButton}>
          <Text style={styles.practiceButtonText}>🎯 Practice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, currentTopic === scienceTopics.length - 1 && styles.disabledButton]}
          onPress={() => setCurrentTopic(Math.min(scienceTopics.length - 1, currentTopic + 1))}
          disabled={currentTopic === scienceTopics.length - 1}
        >
          <Text style={styles.controlButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.topicsList}>
        <Text style={styles.listTitle}>All Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {scienceTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.topicItem,
                index === currentTopic && styles.activeTopicItem
              ]}
              onPress={() => setCurrentTopic(index)}
            >
              <Text style={[
                styles.topicItemText,
                index === currentTopic && styles.activeTopicItemText
              ]}>
                {topic.title}
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
    backgroundColor: Colors.science,
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
    backgroundColor: Colors.science,
    borderRadius: 2,
  },
  topicCard: {
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
  topicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  topicMarathi: {
    fontSize: 20,
    color: Colors.science,
    textAlign: 'center',
    marginBottom: 24,
  },
  conceptsContainer: {
    marginBottom: 24,
  },
  conceptItem: {
    backgroundColor: Colors.science + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  conceptName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  conceptMarathi: {
    fontSize: 16,
    color: Colors.science,
    marginBottom: 4,
  },
  conceptDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  controlButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  controlButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  practiceButton: {
    backgroundColor: Colors.science,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  practiceButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  topicsList: {
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  topicItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTopicItem: {
    backgroundColor: Colors.science,
  },
  topicItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTopicItemText: {
    color: Colors.white,
  },
});

export default ScienceModule;
