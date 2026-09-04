const USERS_KEY = "niyaUsers";
const CURRENT_USER_KEY = "niyaCurrentUser";

// ============================================
// LOGIN
// ============================================

export async function loginUser(email, password) {
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const user = users.find(
    (item) =>
      item.email?.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const loggedInUser = { ...user };
  delete loggedInUser.password;

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(loggedInUser)
  );

  return {
    user: loggedInUser,
    message: "Login successful",
  };
}

// ============================================
// REGISTER
// ============================================

export async function signupUser(userData) {
  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const existingUser = users.find(
    (item) =>
      item.email?.toLowerCase() ===
      userData.email?.toLowerCase()
  );

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const newUser = {
    id: crypto.randomUUID(),
    ...userData,
    addresses: [],
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  const loggedInUser = { ...newUser };
  delete loggedInUser.password;

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(loggedInUser)
  );

  return {
    user: loggedInUser,
    message: "Signup successful",
  };
}

// ============================================
// ADDRESS HELPERS
// ============================================

function migrateLegacyAddress(user) {
  if (!user) return user;

  if (Array.isArray(user.addresses) && user.addresses.length > 0) {
    return user;
  }

  const hasLegacy =
    user.address || user.city || user.state || user.pincode;

  if (!hasLegacy) {
    return { ...user, addresses: [] };
  }

  return {
    ...user,
    addresses: [
      {
        id: crypto.randomUUID(),
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        isDefault: true,
      },
    ],
  };
}

// ============================================
// GET CURRENT USER PROFILE
// ============================================

export async function getProfile() {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!currentUser) {
    return {
      user: null,
    };
  }

  const user = migrateLegacyAddress(JSON.parse(currentUser));

  if (user.addresses) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  return {
    user,
  };
}

// ============================================
// UPDATE CURRENT USER PROFILE
// ============================================

export async function updateProfile(profileData) {
  const currentUser = JSON.parse(
    localStorage.getItem(CURRENT_USER_KEY) || "null"
  );

  if (!currentUser) {
    throw new Error("No user is currently logged in");
  }

  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || "[]"
  );

  const updatedUser = {
    ...currentUser,
    ...profileData,
  };

  const updatedUsers = users.map((user) =>
    user.id === currentUser.id
      ? {
          ...user,
          ...profileData,
        }
      : user
  );

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers)
  );

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(updatedUser)
  );

  return {
    user: updatedUser,
    message: "Profile updated successfully",
  };
}

// ============================================
// LOGOUT
// ============================================

export async function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);

  return {
    success: true,
    message: "Logout successful",
  };
}

























// import { authApi } from "./axiosClient";

// // ============================================
// // LOGIN
// // POST /api/auth/login
// // ============================================
// export async function loginUser(email, password) {
//   const response = await authApi.post("/login", {
//     email,
//     password,
//   });

//   console.log("LOGIN API RESPONSE:", JSON.stringify(response.data, null, 2));

//   return response.data;
// }

// // ============================================
// // REGISTER
// // POST /api/auth/register
// // ============================================
// export async function signupUser(userData) {
//   const response = await authApi.post("/register", userData);

//   return response.data;
// }

// // ============================================
// // GET CURRENT USER PROFILE
// // GET /api/auth/profile
// // ============================================
// export async function getProfile() {
//   const response = await authApi.get("/profile");

//   return response.data;
// }

// // ============================================
// // UPDATE CURRENT USER PROFILE
// // PUT /api/auth/profile
// // ============================================
// export async function updateProfile(profileData) {
//   const response = await authApi.put("/profile", profileData);

//   return response.data;
// }

// // ============================================
// // LOGOUT
// // POST /api/auth/logout
// // ============================================
// export async function logoutUser() {
//   const response = await authApi.post("/logout");

//   return response.data;
// }
