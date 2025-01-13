import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, onChangeSearch, isDarkMode }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Search courses by name or code..."
        placeholderTextColor={isDarkMode ? '#AAA' : '#666'}
        value={searchTerm}
        onChangeText={onChangeSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#1E1E1E',
    color: '#fff',
  },
});

export default SearchBar;
