import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Button, StyleSheet, Animated, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { colors } = useTheme(); // Access the current theme colors
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();

    const animation = Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    animation.start();

    return () => animation.stop();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const teacherRes = await fetchTeachers();
      const courseRes = await fetchCourses();
      setTeachers(teacherRes.data);
      setCourses(courseRes.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [courses, searchQuery]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Teacher Dashboard</Text>

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {/* Display loading spinner */}
      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {/* Display error message */}
      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}

      {/* Animated Fade-in Section */}
      {!loading && !error && (
        <Animated.View style={{ opacity: fadeIn }}>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>Teachers</Text>
          {teachers.length === 0 ? (
            <Text style={[styles.emptyState, { color: colors.text }]}>No teachers available.</Text>
          ) : (
            teachers.map((teacher) => (
              <TeacherInfo
                key={teacher.id}
                teacher={teacher}
                onEdit={() => navigation.navigate("TeacherForm", { teacher })}
                onDelete={async (id) => {
                  await deleteTeacher(id);
                  fetchData();
                }}
              />
            ))
          )}

          <Text style={[styles.sectionHeader, { color: colors.text }]}>Courses</Text>
          {filteredCourses.length === 0 ? (
            <Text style={[styles.emptyState, { color: colors.text }]}>No courses found.</Text>
          ) : (
            <CourseList
              courses={filteredCourses}
              onDelete={async (id) => {
                await deleteCourse(id);
                fetchData();
              }}
            />
          )}
        </Animated.View>
      )}

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
  buttons: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
  error: { fontSize: 16, marginTop: 10 },
  emptyState: { fontSize: 16, marginTop: 10, fontStyle: "italic" },
});

export default DashboardScreen;
