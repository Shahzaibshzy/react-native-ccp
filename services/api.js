import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const fetchTeachers = () => axios.get(`${API_BASE_URL}/teachers`);
export const fetchCourses = () => axios.get(`${API_BASE_URL}/courses`);
export const addTeacher = (teacher) => axios.post(`${API_BASE_URL}/teachers`, teacher);
export const updateTeacher = (id, teacher) => axios.put(`${API_BASE_URL}/teachers/${id}`, teacher);
export const deleteTeacher = (id) => axios.delete(`${API_BASE_URL}/teachers/${id}`);
export const addCourse = (course) => axios.post(`${API_BASE_URL}/courses`, course);
export const updateCourse = (id, course) => axios.put(`${API_BASE_URL}/courses/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_BASE_URL}/courses/${id}`);
