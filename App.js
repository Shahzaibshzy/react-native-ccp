import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Switch } from 'react-native';
import axios from 'axios';
import DashboardScreen from './src/screens/DashboardScreen';
import TeacherFormScreen from './src/screens/TeacherForm';
import CourseFormScreen from './src/screens/CourseForm';
import { v4 as uuidv4 } from 'uuid';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  // Fetch data for teachers and courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get('http://localhost:3000/teachers');
        const courseResponse = await axios.get('http://localhost:3000/courses');
        setTeachers(teacherResponse.data);
        setCourses(courseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  // Handlers for teachers
  const handleSaveTeacher = async (teacher) => {
    try {
      if (teacher.id) {
        // Update existing teacher
        await axios.put(`http://localhost:3000/teachers/${teacher.id}`, teacher);
        setTeachers((prev) =>
          prev.map((t) => (t.id === teacher.id ? teacher : t))
        );
      } else {
        // Add new teacher
        const response = await axios.post('http://localhost:3000/teachers', {
          ...teacher,
          id: Date.now().toString(), // Ensure unique ID
        });
        setTeachers((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error saving teacher:', error.message);
    }
  };

  // Handlers for courses
  const handleSaveCourse = async (course) => {
    try {
      if (course.id) {
        // Update existing course
        const response = await axios.put(`http://localhost:3000/courses/${course.id}`, course);
        console.log('Course updated:', response.data); // Check the response
        setCourses((prev) =>
          prev.map((c) => (c.id === course.id ? course : c))
        );
      } else {
        // Add new course
        const response = await axios.post('http://localhost:3000/courses', {
          ...course,
          id: Date.now().toString(), // Ensure unique ID
        });
        console.log('New course added:', response.data); // Check the response
        setCourses((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Error saving course:', error.message);
    }
  };

  return (
    <NavigationContainer theme={theme}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            options={{ title: 'Dashboard' }}
            children={(props) => (
              <DashboardScreen
                {...props}
                teachers={teachers}
                courses={courses}
                onAddTeacher={() =>
                  props.navigation.navigate('TeacherForm', { onSave: handleSaveTeacher })
                }
                onAddCourse={() =>
                  props.navigation.navigate('CourseForm', { onSave: handleSaveCourse })
                }
                onEditTeacher={(teacher) =>
                  props.navigation.navigate('TeacherForm', {
                    teacher,
                    onSave: handleSaveTeacher,
                  })
                }
                onEditCourse={(course) =>
                  props.navigation.navigate('CourseForm', {
                    course,
                    onSave: handleSaveCourse,
                  })
                }
              />
            )}
          />
          <Stack.Screen
            name="TeacherForm"
            component={TeacherFormScreen}
          />
          <Stack.Screen
            name="CourseForm"
            component={CourseFormScreen}
            initialParams={handleSaveCourse}
          />
        </Stack.Navigator>

        <View style={styles.themeToggleContainer}>
          <Text style={{ color: theme.colors.text }}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
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
    justifyContent: 'space-between',
    padding: 20,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default App;
