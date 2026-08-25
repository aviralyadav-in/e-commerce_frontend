import axios from "axios";

// ============================================
// BASE URLs
// ============================================

const backendBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://shieldnest.theglamstreet.in/api";

const mockoonBaseURL =
  import.meta.env.VITE_MOCKOON_API_BASE_URL || "http://localhost:3001";

// ============================================
// GENERAL / REAL BACKEND API
// ============================================

export const api = axios.create({
  baseURL: backendBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// AUTHENTICATION API — MOCKOON
// ============================================

export const authApi = axios.create({
  baseURL: `${mockoonBaseURL}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================================
// CART API — CURRENTLY REAL BACKEND
// ============================================

export const cartApi = axios.create({
  baseURL: `${backendBaseURL}/cart`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================================
// CONTENT API — MOCKOON
// ============================================

export const contentApi = axios.create({
  baseURL: mockoonBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
