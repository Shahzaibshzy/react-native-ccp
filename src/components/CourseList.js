import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CourseList = ({ courses, onDelete }) => {
  const { colors } = useTheme();

  return (
    <View>
      {courses.map((course) => (
        <View key={course.id} style={[styles.container, { backgroundColor: colors.card }]}>
          <Text style={[styles.courseName, { color: colors.text }]}>{course.name}</Text>
          <Text style={[styles.courseCode, { color: colors.text }]}>Code: {course.code}</Text>
          <Button title="Delete" onPress={() => onDelete(course.id)} color={colors.danger} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseCode: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CourseList;
