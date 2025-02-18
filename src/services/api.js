import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = "https://localhost:7002/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  export const getUserNameFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  export const getIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid"] || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

export const signupUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/teachers/signup`, userData);
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };
  
  export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  export const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers`, getAuthHeaders());
      if (response.data.data && response.data.data.items && Array.isArray(response.data.data.items)) {
        return response.data.data.items;
      } else {
        console.error("Invalid API response for teachers:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return [];
    }
  };
  
  export const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${getIdFromToken()}`, getAuthHeaders());
      debugger;
      if (response.data.data && response.data.data.items && Array.isArray(response.data.data.items)) {
        return response.data.data.items;
      } else {
        console.error("Invalid API response for students:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };
  
  export const createStudent = async (studentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/students`, studentData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  };





