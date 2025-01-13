import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CourseList = ({ courses, onSelectCourse, isDarkMode }) => (
  <FlatList
    data={courses}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelectCourse(item)}>
        <View style={isDarkMode ? styles.darkCourseItem : styles.courseItem}>
          <Text style={isDarkMode ? styles.darkCourseName : styles.courseName}>{item.name}</Text>
          <Text style={isDarkMode ? styles.darkCourseCode : styles.courseCode}>{item.code}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  courseItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  darkCourseItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    elevation: 2,
  },
  courseName: {
    fontSize: 18,
    color: '#000',
  },
  darkCourseName: {
    fontSize: 18,
    color: '#fff',
  },
  courseCode: {
    fontSize: 14,
    color: '#666',
  },
  darkCourseCode: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default CourseList;
