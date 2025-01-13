import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Button, Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/Header';
import TeacherInfo from './src/TeacherInfo';
import SearchBar from './src/SearchBar';
import CourseList from './src/CourseList';
import { fetchTeacherData } from './services/api';

const Stack = createStackNavigator();

// Main Dashboard Screen
const DashboardScreen = ({ navigation }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTeacherData();
        setTeachers(data.teachers);
        setSelectedTeacher(data.teachers[0]); // Default to the first teacher
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      setFilteredCourses(
        selectedTeacher.courses.filter(
          (course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, selectedTeacher]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTeacherChange = (teacherId) => {
    const teacher = teachers.find((t) => t.id.toString() === teacherId);
    setSelectedTeacher(teacher);
    setFilteredCourses(teacher.courses);
  };

  const handleCourseSelect = (course) => {
    navigation.navigate('CourseDetails', { course });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>{error}</Text>
      </View>
    );
  }

  if (!teachers.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.container}>
      <Header isDarkMode={isDarkMode} />
      <Button
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        onPress={toggleDarkMode}
        color={isDarkMode ? '#BB86FC' : '#6200EE'}
      />
      {selectedTeacher && ( // Ensure the Picker only renders after data is available
        <Picker
          selectedValue={selectedTeacher.id.toString()}
          onValueChange={handleTeacherChange}
          style={isDarkMode ? styles.darkPicker : styles.lightPicker}
        >
          {teachers.map((teacher) => (
            <Picker.Item key={teacher.id} label={teacher.name} value={teacher.id.toString()} />
          ))}
        </Picker>
      )}
      {selectedTeacher && <TeacherInfo teacher={selectedTeacher} isDarkMode={isDarkMode} />}
      <SearchBar searchTerm={searchTerm} onChangeSearch={setSearchTerm} isDarkMode={isDarkMode} />
      <CourseList
        courses={filteredCourses}
        onSelectCourse={handleCourseSelect}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

// Course Details Screen
const CourseDetailsScreen = ({ route }) => {
  const { course } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.courseDetailText}>Course Name: {course.name}</Text>
      <Text style={styles.courseDetailText}>Course Code: {course.code}</Text>
      <Text style={styles.courseDetailText}>Course ID: {course.id}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  lightPicker: {
    backgroundColor: '#f9f9f9',
    color: '#000',
    marginVertical: 10,
  },
  darkPicker: {
    backgroundColor: '#333',
    color: '#fff',
    marginVertical: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseDetailText: {
    fontSize: 18,
    marginVertical: 10,
  },
  error: {
    color: 'red',
  },
});

export default App;
