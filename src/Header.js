import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ isDarkMode }) => (
  <View style={styles.header}>
    <Text style={isDarkMode ? styles.darkText : styles.lightText}>Teacher Dashboard</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: 'center',
  },
  lightText: {
    fontSize: 24,
    color: '#000',
  },
  darkText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Header;
