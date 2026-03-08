import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../constants/colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword || !role || !dob) {
      alert('Please fill all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Placeholder - Replace with backend API call later
    navigation.getParent()?.navigate('MainApp');
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      const formatted = selected.toISOString().split('T')[0]; // YYYY-MM-DD
      setDob(formatted);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>✋</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us to start learning</Text>
          </View>

          <View style={styles.form}>
            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.textHint}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={Colors.textHint}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Role */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Role</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={role}
                  onValueChange={(itemValue) => setRole(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select your role" value="" />
                  <Picker.Item label="Student" value="student" />
                  <Picker.Item label="Teacher" value="teacher" />
                  <Picker.Item label="Parent" value="parent" />
                </Picker>
              </View>
            </View>

            {/* Roll Number (only for Student) */}
            {role === 'student' && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Roll Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your roll number"
                  placeholderTextColor={Colors.textHint}
                  value={rollNumber}
                  onChangeText={setRollNumber}
                  keyboardType="numeric"
                />
              </View>
            )}

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={dob ? styles.dateText : styles.placeholderText}>
                  {dob || 'Select your date of birth'}
                </Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            {/* Mobile */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor={Colors.textHint}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.textHint}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor={Colors.textHint}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary },
  form: { width: '100%' },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary, marginBottom: 8 },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.textPrimary,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  picker: { fontSize: 16, color: Colors.textPrimary },
  dateInput: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: Colors.white,
  },
  placeholderText: { color: Colors.textHint, fontSize: 16 },
  dateText: { color: Colors.textPrimary, fontSize: 16 },
  registerButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  registerButtonText: { color: Colors.white, fontSize: 18, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  loginText: { fontSize: 16, color: Colors.textSecondary },
  loginLink: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
});

export default RegisterScreen;
