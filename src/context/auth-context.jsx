import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Firebase user replica containing email, uid/id, displayName
  const [userData, setUserData] = useState(null); // Full user database doc
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("promethix_jwt_token") || "");
  const [loading, setLoading] = useState(true);

  // Prepopulate default admin if no users exist
  useEffect(() => {
    const storedUsers = localStorage.getItem("promethix_users");
    if (!storedUsers) {
      const defaultUsers = [
        {
          id: "admin_1",
          fullName: "Admin User",
          email: "promethix3d@gmail.com",
          password: "admin",
          role: "admin",
          phone: "9832769269",
          address: "Kolkata, West Bengal",
          wishlist: []
        }
      ];
      localStorage.setItem("promethix_users", JSON.stringify(defaultUsers));
    }
  }, []);

  // Sync user profile from local storage on app load
  useEffect(() => {
    const fetchProfile = () => {
      const storedToken = localStorage.getItem("promethix_jwt_token");
      const storedUser = localStorage.getItem("promethix_current_user");
      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      try {
        const profile = JSON.parse(storedUser);
        setUser({
          uid: profile.id,
          email: profile.email,
          displayName: profile.fullName
        });
        setUserData(profile);
        setWishlist(profile.wishlist || []);
        setToken(storedToken);
      } catch (error) {
        console.error("AuthContext: Profile fetch failed:", error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Sign up directly with local storage
  async function signup(fullName, email, password, phone = "", address = "") {
    try {
      const storedUsers = localStorage.getItem("promethix_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already registered");
      }

      const role = email.toLowerCase() === "promethix3d@gmail.com" ? "admin" : "user";
      const newUser = {
        id: `user_${Date.now()}`,
        fullName,
        email,
        password,
        phone,
        address,
        role,
        wishlist: []
      };

      users.push(newUser);
      localStorage.setItem("promethix_users", JSON.stringify(users));

      const mockToken = `mock-jwt-token-${newUser.id}`;
      localStorage.setItem("promethix_jwt_token", mockToken);
      localStorage.setItem("promethix_current_user", JSON.stringify(newUser));

      setToken(mockToken);
      setUser({
        uid: newUser.id,
        email: newUser.email,
        displayName: newUser.fullName
      });
      setUserData(newUser);
      setWishlist([]);
      toast.success("Account registered successfully!");
      return { success: true, data: newUser, token: mockToken };
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  // Login directly with local storage
  async function login(email, password) {
    try {
      const storedUsers = localStorage.getItem("promethix_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const mockToken = `mock-jwt-token-${foundUser.id}`;
      localStorage.setItem("promethix_jwt_token", mockToken);
      localStorage.setItem("promethix_current_user", JSON.stringify(foundUser));

      setToken(mockToken);
      setUser({
        uid: foundUser.id,
        email: foundUser.email,
        displayName: foundUser.fullName
      });
      setUserData(foundUser);
      setWishlist(foundUser.wishlist || []);
      toast.success("Logged in successfully!");
      return { success: true, data: foundUser, token: mockToken };
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  // Google OAuth - Disabled
  async function loginWithGoogle() {
    toast.error("Google Sign-In is disabled. Please register using the standard form.");
    throw new Error("Google Sign-In Disabled");
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("promethix_jwt_token");
    localStorage.removeItem("promethix_current_user");
    setUser(null);
    setUserData(null);
    setWishlist([]);
    setToken("");
    toast.success("Logged out successfully");
  };

  // Update User Profile
  const updateUserProfile = async (data) => {
    if (!token) return;
    try {
      const storedUsers = localStorage.getItem("promethix_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const updatedUsers = users.map(u => {
        if (u.id === userData?.id) {
          const updated = { ...u, ...data };
          localStorage.setItem("promethix_current_user", JSON.stringify(updated));
          setUserData(updated);
          setUser(prev => ({
            ...prev,
            displayName: updated.fullName
          }));
          return updated;
        }
        return u;
      });

      localStorage.setItem("promethix_users", JSON.stringify(updatedUsers));
      toast.success("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Toggle Wishlist Item
  const toggleWishlist = async (productId) => {
    if (!token || !userData) {
      toast.error("Please sign in to manage wishlist");
      return;
    }

    try {
      const storedUsers = localStorage.getItem("promethix_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      let updatedWishlist = [...wishlist];
      if (updatedWishlist.includes(productId)) {
        updatedWishlist = updatedWishlist.filter(id => id !== productId);
        toast.info("Removed from wishlist");
      } else {
        updatedWishlist.push(productId);
        toast.success("Added to wishlist");
      }

      const updatedUsers = users.map(u => {
        if (u.id === userData.id) {
          const updated = { ...u, wishlist: updatedWishlist };
          localStorage.setItem("promethix_current_user", JSON.stringify(updated));
          return updated;
        }
        return u;
      });

      localStorage.setItem("promethix_users", JSON.stringify(updatedUsers));
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const value = {
    user,
    userData,
    wishlist,
    token,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
    toggleWishlist
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
