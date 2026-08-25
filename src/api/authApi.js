import { authApi } from "./axiosClient";

// ============================================
// LOGIN
// POST /api/auth/login
// ============================================
export async function loginUser(email, password) {
  const response = await authApi.post("/login", {
    email,
    password,
  });

  console.log("LOGIN API RESPONSE:", JSON.stringify(response.data, null, 2));

  return response.data;
}

// ============================================
// REGISTER
// POST /api/auth/register
// ============================================
export async function signupUser(userData) {
  const response = await authApi.post("/register", userData);

  return response.data;
}

// ============================================
// GET CURRENT USER PROFILE
// GET /api/auth/profile
// ============================================
export async function getProfile() {
  const response = await authApi.get("/profile");

  return response.data;
}

// ============================================
// UPDATE CURRENT USER PROFILE
// PUT /api/auth/profile
// ============================================
export async function updateProfile(profileData) {
  const response = await authApi.put("/profile", profileData);

  return response.data;
}

// ============================================
// LOGOUT
// POST /api/auth/logout
// ============================================
export async function logoutUser() {
  const response = await authApi.post("/logout");

  return response.data;
}
