import { createContext, useContext, useEffect, useState } from "react";

import { getProfile, loginUser, logoutUser } from "../api/api";

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
    async function checkAuth() {
      try {
        const response = await getProfile();

        const currentUser = response?.user || null;

        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("AUTH CHECK: No active session");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // ===============================
  // LOGIN
  // ===============================

  async function login(email, password) {
    try {
      const response = await loginUser(email, password);

      const loggedInUser = response?.user || null;

      if (!loggedInUser) {
        throw new Error("Login successful but user data was not returned.");
      }

      setUser(loggedInUser);

      return response;
    } catch (error) {
      setUser(null);
      throw error;
    }
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
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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
