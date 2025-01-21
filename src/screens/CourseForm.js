import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

const CourseFormScreen = ({ route, navigation }) => {
  const { course, onSave } = route.params || {};
  const [courseName, setCourseName] = useState(course ? course.name : '');
  const [courseCode, setCourseCode] = useState(course ? course.code : '');
  const [localCourses, setLocalCourses] = useState([]);  // Temporary local array
  const [error, setError] = useState(''); // To store error message
  const { colors } = useTheme();

  // Simulate loading courses from mock data (can replace with actual API call)
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setLocalCourses(response.data);  // Load existing courses from JSON Server
      } catch (error) {
        console.error('Error loading courses:', error.message);
      }
    };
    loadCourses();
  }, []);

  const handleSave = async () => {

    if (!courseName || !courseCode) {
      setError('Both fields are required');
      return; // Prevent saving if any field is empty
    }
    const newCourse = { name: courseName, code: courseCode, id: Date.now().toString() };
    
    // Temporarily store in the local array
    setLocalCourses((prev) => [...prev, newCourse]);
    
    try {
      // Send to JSON server
      await axios.post('http://localhost:3000/courses', newCourse);
      console.log("Course added:", newCourse);
    } catch (error) {
      console.error('Error saving course:', error.message);
    }

    // Update parent component with the new course
    onSave(newCourse);

    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        {course ? 'Edit Course' : 'Add Course'}
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Course Name"
        placeholderTextColor={colors.placeholder}
        value={courseName}
        onChangeText={setCourseName}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Course Code"
        placeholderTextColor={colors.placeholder}
        value={courseCode}
        onChangeText={setCourseCode}
      />
       {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Save" onPress={handleSave} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default CourseFormScreen;
