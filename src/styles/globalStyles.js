import { Appearance } from "react-native";

// Light and Dark theme color palettes
export const lightTheme = {
  background: "#F5F5F5",
  primary: "#4CAF50", // Green
  secondary: "#FF9800", // Orange
  textPrimary: "#212121", // Dark Gray
  textSecondary: "#757575", // Medium Gray
  white: "#FFFFFF",
  danger: "#E57373", // Red
};

export const darkTheme = {
  background: "#212121",
  primary: "#4CAF50",
  secondary: "#FF9800",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0",
  white: "#121212",
  danger: "#E57373",
};

// Dynamically fetch the theme based on the system preference
const currentTheme = Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;

export default currentTheme;
