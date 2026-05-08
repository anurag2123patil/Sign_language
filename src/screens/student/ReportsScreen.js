import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';

const ReportsScreen = ({ navigation }) => {
  // Mock data for the report
  const userData = {
    name: 'Anurag Patil',
    email: 'anurag@example.com',
    role: 'STUDENT',
  };

  const progressData = {
    date: new Date().toLocaleDateString(),
    overallScore: 68,
    modules: [
      { name: 'Alphabets', progress: 100, status: 'Completed' },
      { name: 'Numbers', progress: 85, status: 'In Progress' },
      { name: 'Basic Words', progress: 60, status: 'In Progress' },
      { name: 'Sentences', progress: 20, status: 'Started' },
      // { name: 'Math Symbols', progress: 0, status: 'Not Started' },
    ],
  };

  const renderModuleProgress = (module) => (
    <View key={module.name} style={styles.moduleCard}>
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleName}>{module.name}</Text>
        <Text style={styles.moduleStatus}>{module.status}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${module.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{module.progress}%</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.primary, '#1565C0']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Reports</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Overall Learning Progress</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{progressData.overallScore}%</Text>
            <Text style={styles.scoreSubtext}>Mastery Level</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Ongoing</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Module Breakdown</Text>
        {progressData.modules.map(renderModuleProgress)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    marginBottom: 16,
  },
  scoreContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#E3F2FD',
    borderTopColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  scoreSubtext: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  moduleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  moduleStatus: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEE',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    width: 35,
  },
});

export default ReportsScreen;
