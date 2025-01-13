import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TeacherInfo = ({ teacher, isDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>ID: {teacher.id}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Name: {teacher.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 10,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default TeacherInfo;
