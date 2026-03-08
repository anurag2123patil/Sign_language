import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';

const JoinClassScreen = ({ navigation }) => {
  const [classCode, setClassCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinClass = () => {
    if (!classCode.trim()) {
      Alert.alert('Error', 'Please enter a class code');
      return;
    }

    // Backend removed - class joining functionality is no longer available
    Alert.alert('Notice', 'Class joining feature is not available in offline mode.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join a Class</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit class code provided by your teacher
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Class Code</Text>
          <TextInput
            style={styles.input}
            value={classCode}
            onChangeText={setClassCode}
            placeholder="Enter class code"
            maxLength={6}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.joinButton, isLoading && styles.disabledButton]}
          onPress={handleJoinClass}
          disabled={isLoading}
        >
          <Text style={styles.joinButtonText}>
            {isLoading ? 'Joining...' : 'Join Class'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
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
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: Colors.white,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  joinButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default JoinClassScreen;
