import { createContext, useContext, useEffect, useState } from "react";

import {
  getProfile,
  loginUser,
  logoutUser,
  updateProfile,
} from "../api/authApi";

// ===============================
// AUTH CONTEXT
// ===============================

const AuthContext = createContext(null);

// ===============================
// AUTH PROVIDER
// ===============================

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // CHECK AUTH
  // ===============================

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const response = await getProfile();
        const currentUser = response?.user || null;

        if (mounted) {
          setUser(currentUser);
        }
      } catch (error) {
        console.log("AUTH CHECK: No active session");

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // LOGIN
  // ===============================

  async function login(email, password) {
    try {
      const response = await loginUser(email, password);
      const loggedInUser = response?.user || null;

      if (!loggedInUser) {
        throw new Error(
          "Login successful but user data was not returned."
        );
      }

      setUser(loggedInUser);

      return response;
    } catch (error) {
      setUser(null);
      throw error;
    }
  }

  // ===============================
  // UPDATE PROFILE
  // ===============================

  async function updateUserProfile(profileData) {
    const response = await updateProfile(profileData);
    const updatedUser = response?.user || null;

    if (updatedUser) {
      setUser(updatedUser);
    }

    return response;
  }

  // ===============================
  // LOGOUT
  // ===============================

  async function logout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setUser(null);
    }
  }

  // ===============================
  // CONTEXT VALUE
  // ===============================

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    updateUserProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ===============================
// CUSTOM AUTH HOOK
// ===============================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}