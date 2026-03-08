import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.userName}>User</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
        <Text style={styles.userRole}>STUDENT</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔒</Text>
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Help & Support</Text>
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
  profileCard: {
    backgroundColor: Colors.primary,
    padding: 32,
    alignItems: 'center',
    paddingTop: 60,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.white + 'CC',
    marginBottom: 8,
  },
  userRole: {
    fontSize: 14,
    color: Colors.white + 'AA',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    padding: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  logoutItem: {
    backgroundColor: Colors.error + '10',
    borderWidth: 1,
    borderColor: Colors.error + '30',
  },
  logoutText: {
    color: Colors.error,
  },
});

export default ProfileScreen;
