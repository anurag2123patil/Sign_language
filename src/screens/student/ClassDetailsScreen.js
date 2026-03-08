import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';

const ClassDetailsScreen = ({ route, navigation }) => {
  const { classData } = route.params || {};
  const [activeTab, setActiveTab] = useState('media');
  const media = [];
  const assignments = [];

  const renderMediaItem = (item) => (
    <TouchableOpacity
      key={item._id}
      style={styles.mediaItem}
      onPress={() => navigation.navigate('MediaPlayer', { media: item })}
    >
      <View style={styles.mediaIcon}>
        <Text style={styles.mediaTypeIcon}>
          {item.type === 'video' ? '🎥' : '🖼️'}
        </Text>
      </View>
      <View style={styles.mediaInfo}>
        <Text style={styles.mediaTitle}>{item.title}</Text>
        <Text style={styles.mediaDescription}>{item.description}</Text>
        <Text style={styles.mediaMeta}>
          {item.type} • {item.category} • {item.viewCount} views
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderAssignmentItem = (assignment) => (
    <TouchableOpacity
      key={assignment._id}
      style={styles.assignmentItem}
      onPress={() => navigation.navigate('AssignmentDetails', { assignment })}
    >
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
        <Text style={styles.assignmentDueDate}>
          Due: {new Date(assignment.dueDate).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.assignmentInfo}>
        <Text style={styles.assignmentDescription}>{assignment.description}</Text>
        <Text style={styles.assignmentMeta}>
          {assignment.questions.length} questions • {assignment.totalPoints} points
        </Text>
      </View>
      <View style={styles.assignmentStatus}>
        {assignment.submissionStatus === 'submitted' ? (
          <View style={[styles.statusBadge, styles.submittedBadge]}>
            <Text style={styles.statusText}>Submitted</Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, styles.pendingBadge]}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    if (activeTab === 'media') {
      return (
        <View style={styles.tabContent}>
          {media.length > 0 ? (
            media.map(renderMediaItem)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No media available yet</Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.tabContent}>
          {assignments.length > 0 ? (
            assignments.map(renderAssignmentItem)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No assignments available yet</Text>
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.className}>{classData?.name || 'Class'}</Text>
        <Text style={styles.classSubject}>{classData?.subject || 'Subject'}</Text>
        <Text style={styles.teacherName}>Teacher: {classData?.teacherId?.name || 'N/A'}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'media' && styles.activeTab]}
          onPress={() => setActiveTab('media')}
        >
          <Text style={[styles.tabText, activeTab === 'media' && styles.activeTabText]}>
            Media ({media.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
          onPress={() => setActiveTab('assignments')}
        >
          <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
            Assignments ({assignments.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 24,
    paddingTop: 60,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 16,
    color: Colors.white + 'CC',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    color: Colors.white + 'AA',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  mediaItem: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mediaIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mediaTypeIcon: {
    fontSize: 24,
  },
  mediaInfo: {
    flex: 1,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  mediaMeta: {
    fontSize: 12,
    color: Colors.textHint,
  },
  assignmentItem: {
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
  assignmentHeader: {
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  assignmentDueDate: {
    fontSize: 14,
    color: Colors.warning,
    fontWeight: '500',
  },
  assignmentInfo: {
    marginBottom: 12,
  },
  assignmentDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  assignmentMeta: {
    fontSize: 12,
    color: Colors.textHint,
  },
  assignmentStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  submittedBadge: {
    backgroundColor: Colors.success + '20',
  },
  pendingBadge: {
    backgroundColor: Colors.warning + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default ClassDetailsScreen;
