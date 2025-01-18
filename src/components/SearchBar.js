import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SearchBar = ({ query, setQuery }) => {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
      placeholder="Search courses"
      placeholderTextColor={colors.placeholder}
      value={query}
      onChangeText={setQuery}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default SearchBar;
