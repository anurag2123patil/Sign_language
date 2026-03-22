import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

// Import screens
import StudentDashboard from '../screens/student/StudentDashboard';
import JoinClassScreen from '../screens/student/JoinClassScreen';
import ClassDetailsScreen from '../screens/student/ClassDetailsScreen';
import PracticeScreen from '../screens/student/PracticeScreen';
import WritingPracticeScreen from '../screens/student/WritingPracticeScreen';
import TypingPracticeScreen from '../screens/student/TypingPracticeScreen';
import ReportsScreen from '../screens/student/ReportsScreen';
import ProfileScreen from '../screens/student/ProfileScreen';

// Learning modules
import AlphabetsModule from '../screens/student/AlphabetsModule';
import NumbersModule from '../screens/student/NumbersModule';
import WordsModule from '../screens/student/WordsModule';
import SentencesModule from '../screens/student/SentencesModule';
import MathModule from '../screens/student/MathModule';
import ScienceModule from '../screens/student/ScienceModule';
import CameraGestureScreen from '../screens/student/CameraGestureScreen';
import CameraNumberScreen from '../screens/student/Cameranumberscreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Dashboard Stack
const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={StudentDashboard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="JoinClass"
      component={JoinClassScreen}
      options={{
        title: 'Join Class',
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="ClassDetails"
      component={ClassDetailsScreen}
      options={{
        title: 'Class Details',
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="AlphabetsModule"
      component={AlphabetsModule}
      options={{
        title: 'Alphabets',
        headerStyle: { backgroundColor: Colors.alphabet },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="NumbersModule"
      component={NumbersModule}
      options={{
        title: 'Numbers',
        headerStyle: { backgroundColor: Colors.number },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="WordsModule"
      component={WordsModule}
      options={{
        title: 'Words',
        headerStyle: { backgroundColor: Colors.word },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="CameraGesture"
      component={CameraGestureScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Cameranumberscreen"
      component={CameraNumberScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SentencesModule"
      component={SentencesModule}
      options={{
        title: 'Sentences',
        headerStyle: { backgroundColor: Colors.sentence },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="MathModule"
      component={MathModule}
      options={{
        title: 'Mathematics',
        headerStyle: { backgroundColor: Colors.math },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="ScienceModule"
      component={ScienceModule}
      options={{
        title: 'Science',
        headerStyle: { backgroundColor: Colors.science },
        headerTintColor: Colors.white,
      }}
    />
  </Stack.Navigator>
);

// Practice Stack
const PracticeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PracticeHome"
      component={PracticeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="WritingPractice"
      component={WritingPracticeScreen}
      options={{
        title: 'Writing Practice',
        headerStyle: { backgroundColor: Colors.writing },
        headerTintColor: Colors.white,
      }}
    />
    <Stack.Screen
      name="TypingPractice"
      component={TypingPracticeScreen}
      options={{
        title: 'Typing Practice',
        headerStyle: { backgroundColor: Colors.typing },
        headerTintColor: Colors.white,
      }}
    />
  </Stack.Navigator>
);

// Reports Stack
const ReportsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ReportsHome"
      component={ReportsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileHome"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Main Student Navigator
const StudentNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Practice') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeStack}
        options={{ title: 'Practice' }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsStack}
        options={{ title: 'Reports' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default StudentNavigator;
