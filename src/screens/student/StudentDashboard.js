import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';

const StudentDashboard = ({ navigation }) => {
  const classes = [];

  const navigateToClass = (classData) => {
    navigation.navigate('ClassDetails', { classData });
  };

  const navigateToJoinClass = () => {
    navigation.navigate('JoinClass');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToReports = () => {
    navigation.navigate('Reports');
  };

  const renderClassCard = (classData) => (
    <TouchableOpacity
      key={classData._id}
      style={styles.classCard}
      onPress={() => navigateToClass(classData)}
    >
      <View style={styles.classHeader}>
        <Text style={styles.className}>{classData.name}</Text>
        <Text style={styles.classSubject}>{classData.subject}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.teacherName}>Teacher: {classData.teacherId?.name}</Text>
        <Text style={styles.studentCount}>
          {classData.studentCount || 0} students
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard} onPress={navigateToJoinClass}>
          <Text style={styles.actionIcon}>📚</Text>
          <Text style={styles.actionText}>Join Class</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Practice')}>
          <Text style={styles.actionIcon}>✍️</Text>
          <Text style={styles.actionText}>Practice</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={navigateToReports}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>Reports</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={navigateToProfile}>
          <Text style={styles.actionIcon}>👤</Text>
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLearningModules = () => (
    <View style={styles.modulesContainer}>
      <Text style={styles.sectionTitle}>Learning Modules</Text>
      <View style={styles.modulesGrid}>
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.alphabet }]}
          onPress={() => navigation.navigate('AlphabetsModule')}
        >
          <Text style={styles.moduleIcon}>🔤</Text>
          <Text style={styles.moduleTitle}>Alphabets</Text>
          <Text style={styles.moduleDescription}>Learn Marathi alphabets with sign language</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.number }]}
          onPress={() => navigation.navigate('NumbersModule')}
        >
          <Text style={styles.moduleIcon}>🔢</Text>
          <Text style={styles.moduleTitle}>Numbers</Text>
          <Text style={styles.moduleDescription}>Master numbers and counting</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.word }]}
          onPress={() => navigation.navigate('WordsModule')}
        >
          <Text style={styles.moduleIcon}>📝</Text>
          <Text style={styles.moduleTitle}>Words</Text>
          <Text style={styles.moduleDescription}>Build vocabulary with flashcards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.sentence }]}
          onPress={() => navigation.navigate('SentencesModule')}
        >
          <Text style={styles.moduleIcon}>💬</Text>
          <Text style={styles.moduleTitle}>Sentences</Text>
          <Text style={styles.moduleDescription}>Form sentences and conversations</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.math }]}
          onPress={() => navigation.navigate('MathModule')}
        >
          <Text style={styles.moduleIcon}>🧮</Text>
          <Text style={styles.moduleTitle}>Mathematics</Text>
          <Text style={styles.moduleDescription}>Practice math with sign language</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.moduleCard, { backgroundColor: Colors.science }]}
          onPress={() => navigation.navigate('ScienceModule')}
        >
          <Text style={styles.moduleIcon}>🔬</Text>
          <Text style={styles.moduleTitle}>Science</Text>
          <Text style={styles.moduleDescription}>Explore science concepts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome!</Text>
        <Text style={styles.subGreeting}>Ready to continue learning?</Text>
      </View>

      {renderQuickActions()}

      <View style={styles.classesContainer}>
        <Text style={styles.sectionTitle}>My Classes</Text>
        {classes.length > 0 ? (
          classes.map(renderClassCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No classes yet</Text>
            <TouchableOpacity style={styles.joinButton} onPress={navigateToJoinClass}>
              <Text style={styles.joinButtonText}>Join Your First Class</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {renderLearningModules()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: Colors.primary,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.white + 'CC',
  },
  quickActionsContainer: {
    padding: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  classesContainer: {
    padding: 24,
    paddingTop: 0,
  },
  classCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classHeader: {
    marginBottom: 8,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  classSubject: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  classInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teacherName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  studentCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  joinButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  modulesContainer: {
    padding: 24,
    paddingTop: 0,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moduleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 12,
    color: Colors.white + 'CC',
    lineHeight: 16,
  },
});

export default StudentDashboard;
