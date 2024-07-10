import axios from 'axios';

const BASE_URL = '/api/users'; 

const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching all users: ${error.message}`);
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  },

  // Add more methods as needed for user-related API calls
};

export default userService;
