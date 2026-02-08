import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
    const { user: currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", currentUser.uid),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-background text-text-primary">
                <Package className="w-16 h-16 mb-4 text-text-muted" />
                <h2 className="text-3xl font-heading font-bold mb-4 text-primary">No orders found</h2>
                <p className="text-text-muted mb-8 max-w-md">
                    You haven't placed any orders yet.
                </p>
                <Link to="/products">
                    <Button size="lg" className="rounded-none px-8 bg-primary hover:bg-slate-800 text-white uppercase font-bold tracking-widest">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-heading font-bold mb-8 text-primary">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-surface border border-border p-6 rounded-lg">
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-border pb-4 gap-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-lg text-primary">Order #{order.id.slice(0, 8)}</span>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-text-secondary mt-1">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {order.createdAt?.toDate().toLocaleDateString()} at {order.createdAt?.toDate().toLocaleTimeString()}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-text-secondary">Total Amount</div>
                                    <div className="text-xl font-bold text-primary">₹{order.total}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-surface-light border border-border shrink-0">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary">{item.name}</h4>
                                            <p className="text-sm text-text-secondary">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="ml-auto font-medium text-primary">
                                            ₹{item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {order.notes && (
                                <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">
                                    <span className="font-bold">Note:</span> {order.notes}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
