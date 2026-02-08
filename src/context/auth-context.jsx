import React, { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sign up with Email/Password
    async function signup(email, password, name) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Create a user document in Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: email,
            fullName: name,
            createdAt: new Date().toISOString(),
        });
        return userCredential;
    }

    // Login with Email/Password
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Login with Google
    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // Check if user exists in Firestore, if not create
        const userDocRef = doc(db, "users", result.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                uid: result.user.uid,
                email: result.user.email,
                fullName: result.user.displayName,
                createdAt: new Date().toISOString(),
            });
        }
        return result;
    }


    // Fetch user data from Firestore
    const fetchUserData = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUserData(data);
                setWishlist(data.wishlist || []);
            } else {
                setUserData(null);
                setWishlist([]);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // toast.error("Failed to fetch user data."); // Suppress to avoid spam on load
        }
    };

    useEffect(() => {
        console.log("AuthContext: Setting up onAuthStateChanged listener");
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("AuthContext: onAuthStateChanged fired", currentUser ? "User Logged In" : "User Logged Out", currentUser?.email);
            setUser(currentUser);
            if (currentUser) {
                console.log("AuthContext: Fetching user data for", currentUser.uid);
                await fetchUserData(currentUser.uid);
            } else {
                setUserData(null);
                setWishlist([]);
            }
            setLoading(false);
            console.log("AuthContext: Loading set to false");
        });
        return () => {
            console.log("AuthContext: Unsubscribing listener");
            unsubscribe();
        };
    }, []);

    // Update User Profile
    const updateUserProfile = async (data) => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, data, { merge: true });
            await fetchUserData(user.uid);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    // Toggle Wishlist Item
    const toggleWishlist = async (productId) => {
        if (!user) {
            toast.error("Please sign in to manage wishlist");
            return;
        }
        const userRef = doc(db, "users", user.uid);
        let newWishlist = [...wishlist];

        if (newWishlist.includes(productId)) {
            newWishlist = newWishlist.filter(id => id !== productId);
            toast.info("Removed from wishlist");
        } else {
            newWishlist.push(productId);
            toast.success("Added to wishlist");
        }

        try {
            await setDoc(userRef, { wishlist: newWishlist }, { merge: true });
            setWishlist(newWishlist);
        } catch (error) {
            console.error("Error updating wishlist:", error);
            toast.error("Failed to update wishlist");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUserData(null);
            setWishlist([]);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to log out");
        }
    };

    const value = {
        user,
        userData,
        wishlist,
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
