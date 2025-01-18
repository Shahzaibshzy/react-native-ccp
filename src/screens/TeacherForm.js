import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const TeacherForm = ({ route, navigation }) => {
  const { teacher, onSave } = route.params || {};
  const [name, setName] = useState(teacher ? teacher.name : '');
  const [id, setId] = useState(teacher ? teacher.id : '');
  const { colors } = useTheme();

  const handleSave = () => {
    const newTeacher = { id, name };
    onSave(newTeacher);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        {teacher ? 'Edit Teacher' : 'Add Teacher'}
      </Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Teacher Name"
        placeholderTextColor={colors.placeholder}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Teacher ID"
        placeholderTextColor={colors.placeholder}
        value={id}
        onChangeText={setId}
      />
      <Button title="Save" onPress={handleSave} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default TeacherForm;
