import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  loginUser,
  logoutUser,
} from "../api/api";

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
  // CHECK CURRENT AUTH SESSION
  // ===============================
  // Page refresh hone ke baad backend se
  // current logged-in user check karega.
  //
  // Backend HTTP-only cookie handle karta hai,
  // isliye localStorage me token save nahi karna.

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await getProfile();

        const currentUser = response?.user || response;

        setUser(currentUser || null);
      } catch (error) {
        // User logged in nahi hai ya session expire ho gaya.
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
      // Login API call

      // Login ke baad fresh profile fetch karenge
      // taaki AuthContext ke paas complete user data ho.
      const response = await loginUser(email, password);

    const loggedInUser = response?.user || null;

    setUser(loggedInUser);

    return response;
    } catch (error) {
      // Login fail hua to user state clear rakho.
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

      // Logout API fail ho bhi jaye,
      // frontend auth state clear kar denge.
    } finally {
      setUser(null);
    }
  }

  // ===============================
  // AUTH CONTEXT VALUE
  // ===============================

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
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
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}