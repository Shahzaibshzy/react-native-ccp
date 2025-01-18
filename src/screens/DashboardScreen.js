import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { fetchTeachers, fetchCourses, deleteTeacher, deleteCourse } from "../../services/api";
import SearchBar from "../components/SearchBar";
import TeacherInfo from "../components/TeacherInfo";
import CourseList from "../components/CourseList";
import { useTheme } from '@react-navigation/native';

const DashboardScreen = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fadeIn] = useState(new Animated.Value(0)); // Fade-in animation
  const { colors } = useTheme(); // Access the current theme colors
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();

    Animated.timing(fadeIn, {
      toValue: 1, 
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchData = async () => {
    const teacherRes = await fetchTeachers();
    const courseRes = await fetchCourses();
    setTeachers(teacherRes.data);
    setCourses(courseRes.data);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Teacher Dashboard</Text>
      
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* Animated Fade-in Section */}
      <Animated.View style={{ opacity: fadeIn }}>
        <Text style={[styles.sectionHeader, { color: colors.text }]}>Teachers</Text>
        {teachers.map((teacher) => (
          <TeacherInfo
            key={teacher.id}
            teacher={teacher}
            onEdit={() => navigation.navigate("TeacherForm", { teacher })}
            onDelete={async (id) => {
              await deleteTeacher(id);
              fetchData();
            }}
          />
        ))}

        <Text style={[styles.sectionHeader, { color: colors.text }]}>Courses</Text>
        <CourseList
          courses={filteredCourses}
          onDelete={async (id) => {
            await deleteCourse(id);
            fetchData();
          }}
        />
      </Animated.View>

      {/* Add Teacher & Add Course Buttons */}
      <View style={styles.buttons}>
        <Button title="Add Teacher" onPress={() => navigation.navigate("TeacherForm", { onSave: fetchData })} />
        <Button title="Add Course" onPress={() => navigation.navigate("CourseForm", { onSave: fetchData })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  sectionHeader: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  buttons: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" }
});

export default DashboardScreen;
