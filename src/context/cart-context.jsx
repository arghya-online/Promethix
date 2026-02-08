import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user: currentUser } = useAuth();
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("PROMETHIX3D_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sync from Firestore when user logs in
    useEffect(() => {
        if (!currentUser) return;

        const cartRef = doc(db, "carts", currentUser.uid);
        const unsubscribe = onSnapshot(cartRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Optional: merge logic here if complex, for now trust Firestore as source of truth when logged in
                // OR simplistic merge: if local cart has items and remote is empty, push local to remote. 
                // We'll stick to a simpler strategy: Firestore overwrites local on login, 
                // but we could implement a merge strategy if needed.
                // Better strategy: On login, if local cart has items, add them to firestore, then clear local.
                setCart(data.items || []);
            }
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Save to LocalStorage (always) and Firestore (if logged in)
    useEffect(() => {
        localStorage.setItem("PROMETHIX3D_cart", JSON.stringify(cart));

        if (currentUser) {
            const saveToFirestore = async () => {
                const cartRef = doc(db, "carts", currentUser.uid);
                await setDoc(cartRef, { items: cart }, { merge: true });
            };
            saveToFirestore();
        }
    }, [cart, currentUser]);


    const addToCart = (product, quantity = 1, notes = "") => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, notes }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce(
        (total, item) => total + (item.price || 0) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
