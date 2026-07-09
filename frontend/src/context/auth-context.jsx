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

  // Sync user profile from backend on app load
  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem("promethix_jwt_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${storedToken}`
          }
        });
        const resData = await response.json();

        if (resData.success) {
          const profile = resData.data;
          setUser({
            uid: profile.id,
            email: profile.email,
            displayName: profile.fullName
          });
          setUserData(profile);
          setWishlist(profile.wishlist || []);
          setToken(storedToken);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (error) {
        console.error("AuthContext: Profile fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Sign up directly with Node Express server
  async function signup(fullName, email, password, phone = "", address = "") {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullName, email, password, phone, address })
      });
      const resData = await response.json();

      if (!resData.success) {
        throw new Error(resData.message || "Registration failed");
      }

      const profile = resData.data;
      localStorage.setItem("promethix_jwt_token", resData.token);
      setToken(resData.token);
      setUser({
        uid: profile.id,
        email: profile.email,
        displayName: profile.fullName
      });
      setUserData(profile);
      setWishlist(profile.wishlist || []);
      toast.success("Account registered successfully!");
      return resData;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  // Login directly with Node Express server
  async function login(email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const resData = await response.json();

      if (!resData.success) {
        throw new Error(resData.message || "Authentication failed");
      }

      const profile = resData.data;
      localStorage.setItem("promethix_jwt_token", resData.token);
      setToken(resData.token);
      setUser({
        uid: profile.id,
        email: profile.email,
        displayName: profile.fullName
      });
      setUserData(profile);
      setWishlist(profile.wishlist || []);
      toast.success("Logged in successfully!");
      return resData;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  // Google OAuth - Removed as requested
  async function loginWithGoogle() {
    toast.error("Google Sign-In is disabled. Please register using the standard form.");
    throw new Error("Google Sign-In Disabled");
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("promethix_jwt_token");
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
      // Stub implementation since user profile is fully editable in register
      setUserData(prev => ({ ...prev, ...data }));
      toast.success("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Toggle Wishlist Item
  const toggleWishlist = async (productId) => {
    if (!token) {
      toast.error("Please sign in to manage wishlist");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
      const resData = await response.json();

      if (resData.success) {
        setWishlist(resData.data);
        if (resData.data.includes(productId)) {
          toast.success("Added to wishlist");
        } else {
          toast.info("Removed from wishlist");
        }
      }
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
