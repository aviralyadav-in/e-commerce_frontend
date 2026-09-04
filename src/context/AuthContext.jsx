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
  // ADDRESS MANAGEMENT (local helper)
  // Saves up to 3 addresses in the user object.
  // Each address: { id, address, city, state, pincode, isDefault }
  // ===============================

  const MAX_ADDRESSES = 3;

  function buildAddressObject(partial = {}) {
    return {
      id: partial.id || crypto.randomUUID(),
      address: partial.address || "",
      city: partial.city || "",
      state: partial.state || "",
      pincode: partial.pincode || "",
      isDefault: partial.isDefault || false,
    };
  }

  async function addAddress(addressData) {
    if (!user) throw new Error("Not logged in");

    const currentAddresses = Array.isArray(user.addresses)
      ? user.addresses
      : [];

    if (currentAddresses.length >= MAX_ADDRESSES) {
      throw new Error(`You can save up to ${MAX_ADDRESSES} addresses.`);
    }

    const isFirst = currentAddresses.length === 0;
    const newAddress = buildAddressObject({
      ...addressData,
      isDefault: addressData.isDefault ?? isFirst,
    });

    const updatedAddresses = isFirst
      ? [newAddress]
      : currentAddresses.map((a) => ({ ...a, isDefault: false })).concat(
          newAddress,
        );

    const response = await updateProfile({ addresses: updatedAddresses });
    setUser(response.user);
    return response.user.addresses;
  }

  async function updateAddressById(id, patch) {
    if (!user) throw new Error("Not logged in");

    const currentAddresses = Array.isArray(user.addresses)
      ? user.addresses
      : [];

    const updatedAddresses = currentAddresses.map((a) =>
      a.id === id ? { ...a, ...patch } : a,
    );

    const response = await updateProfile({ addresses: updatedAddresses });
    setUser(response.user);
    return response.user.addresses;
  }

  async function removeAddressById(id) {
    if (!user) throw new Error("Not logged in");

    const currentAddresses = Array.isArray(user.addresses)
      ? user.addresses
      : [];

    const updatedAddresses = currentAddresses.filter(
      (a) => a.id !== id,
    );

    if (
      updatedAddresses.length > 0 &&
      !updatedAddresses.some((a) => a.isDefault)
    ) {
      updatedAddresses[0].isDefault = true;
    }

    const response = await updateProfile({ addresses: updatedAddresses });
    setUser(response.user);
    return response.user.addresses;
  }

  async function setDefaultAddressById(id) {
    if (!user) throw new Error("Not logged in");

    const currentAddresses = Array.isArray(user.addresses)
      ? user.addresses
      : [];

    const updatedAddresses = currentAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));

    const response = await updateProfile({ addresses: updatedAddresses });
    setUser(response.user);
    return response.user.addresses;
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
    addAddress,
    updateAddressById,
    removeAddressById,
    setDefaultAddressById,
    maxAddresses: MAX_ADDRESSES,
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