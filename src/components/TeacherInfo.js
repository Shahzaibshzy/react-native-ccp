import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const TeacherInfo = ({ teacher, onEdit, onDelete }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.id, { color: colors.text }]}>ID: {teacher.id}</Text>
      <Text style={[styles.name, { color: colors.text }]}>{teacher.name}</Text>
      <Text style={[styles.name, { color: colors.text }]}>Courses: {teacher.courses}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => onEdit(teacher)} color={colors.primary} />
        <Button title="Delete" onPress={() => onDelete(teacher.id)} color={colors.danger} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TeacherInfo;
