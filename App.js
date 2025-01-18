import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import TeacherFormScreen from './src/screens/TeacherForm';  
import CourseFormScreen from './src/screens/CourseForm';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Switch between Dark and Light Theme
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Content of your app here */}
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TeacherForm" component={TeacherFormScreen} />
          <Stack.Screen name="CourseForm" component={CourseFormScreen} />
        </Stack.Navigator>

        {/* Switch for toggling Dark/Light mode */}
        <View style={styles.themeToggleContainer}>
          <Text style={{ color: theme.colors.text }}>`{!isDarkMode? 'Light Mode':'Dark Mode'}`</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Ensures content is spread out and switch stays at bottom
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',  // Align toggle to the right side
    marginBottom: 20,  // Padding from the bottom
  },
});

export default App;