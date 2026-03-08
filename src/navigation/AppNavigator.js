import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import StudentNavigator from './StudentNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="MainApp" component={StudentNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
