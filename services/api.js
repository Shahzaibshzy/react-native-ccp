import axios from 'axios';
import mockData from './mockData.json';

// Simulate a Mock API
export const fetchTeacherData = async () => {
  try {
    // Uncomment if using a real API
    // const response = await axios.get('https://example.com/api');
    // return response.data;

    // Simulate an API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData;
  } catch (error) {
    throw new Error('Failed to fetch data.');
  }
};
