// import axios from 'axios';

// const BASE_URL = "https://api.example.com"; // Replace with your actual API URL

// // Helper function to handle API responses
// const handleResponse = (response) => {
//   if (response.status >= 400) {
//     throw new Error(response.data.message || "Something went wrong");
//   }
//   return response.data;
// };

// // Configure request headers
// const getHeaders = () => {
//   const token = localStorage.getItem("token");
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return headers;
// };

// // API methods
// const api = {
//   // Auth endpoints
//   auth: {
//     login: async (email, password) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/auth/login/`, { email, password }, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     register: async (userData) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/auth/register/`, userData, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     getCurrentUser: async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/auth/me/`, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // Issues endpoints
//   issues: {
//     getAll: async (params = {}) => {
//       try {
//         const queryString = new URLSearchParams(params).toString();
//         const response = await axios.get(`${BASE_URL}/issues/?${queryString}`, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     getById: async (id) => {
//       try {
//         const response = await axios.get(`${BASE_URL}/issues/${id}/`, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     create: async (issueData) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/issues/`, issueData, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     update: async (id, issueData) => {
//       try {
//         const response = await axios.patch(`${BASE_URL}/issues/${id}/`, issueData, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },

//     addComment: async (issueId, comment) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/issues/${issueId}/comments/`, { content: comment }, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // Users endpoints
//   users: {
//     getAll: async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/users/`, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },

//   // Dashboard endpoints
//   dashboard: {
//     getStats: async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/dashboard/stats/`, {
//           headers: getHeaders(),
//         });
//         return handleResponse(response);
//       } catch (error) {
//         throw error;
//       }
//     },
//   },
// };

// export default api;

