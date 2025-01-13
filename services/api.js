import axios from 'axios';
import mockData from './mockData.json';

// Simulate a Mock API
export const fetchTeacherData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData;
  } catch (error) {
    throw new Error('Failed to fetch data.');
  }
};
