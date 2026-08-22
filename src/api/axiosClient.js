import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Product / General Website API instance
export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication API instance
export const authApi = axios.create({
  baseURL: `${baseURL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Cart API instance
export const cartApi = axios.create({
  baseURL: `${baseURL}/cart`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
