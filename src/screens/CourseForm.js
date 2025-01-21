import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

import { useTheme } from '@react-navigation/native';

const CourseFormScreen = ({ route, navigation }) => {
  const { course, onSave } = route.params || {};
  const [courseName, setCourseName] = useState(course ? course.name : '');
  const [courseCode, setCourseCode] = useState(course ? course.code : '');
  const { colors } = useTheme();

  const handleSave = () => {
    const newCourse = { name: courseName, code: courseCode };
    console.log("Saving course in form: ", newCourse);  // Log to check
    onSave(newCourse);  // Save course by calling onSave
    navigation.goBack();  // Go back to the previous screen
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
