import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X, Wallet, CreditCard, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);

    // Offline Order Form State
    const [customerName, setCustomerName] = useState("");
    const [broughtBy, setBroughtBy] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash"); // cash | online
    const [cartItems, setCartItems] = useState([]);

    // Item Addition State
    const [selectedProductId, setSelectedProductId] = useState("");
    const [customItemName, setCustomItemName] = useState("");
    const [itemQty, setItemQty] = useState(1);
    const [manualPrice, setManualPrice] = useState("");

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.email !== adminEmail) {
                navigate("/");
                toast.error("Access denied. Admin only.");
            } else {
                fetchOrders();
            }
        }
    }, [user, authLoading, navigate, adminEmail]);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });
            toast.success(`Order updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order? This cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "orders", orderId));
            toast.success("Order deleted successfully");
            fetchOrders();
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Failed to delete order");
        }
    }

    // --- Offline Order Logic ---

    // Derived Total
    const orderTotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [cartItems]);

    const handleAddItem = (e) => {
        e.preventDefault();

        let newItem = null;

        if (selectedProductId && selectedProductId !== "custom") {
            const product = PRODUCTS.find(p => p.id === parseInt(selectedProductId));
            if (product) {
                newItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price, // Use base price or discounted? Using price for simplicity
                    quantity: parseInt(itemQty)
                };
            }
        } else if (customItemName && manualPrice) {
            newItem = {
                id: `custom_${Date.now()}`,
                name: customItemName,
                price: parseFloat(manualPrice),
                quantity: parseInt(itemQty)
            };
        }

        if (newItem) {
            setCartItems([...cartItems, newItem]);
            // Reset item inputs
            setSelectedProductId("");
            setCustomItemName("");
            setItemQty(1);
            setManualPrice("");
        } else {
            toast.error("Please select a product or enter custom item details");
        }
    };

    const removeCartItem = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    const handleAddOfflineOrder = async (e) => {
        e.preventDefault();
        if (!customerName || cartItems.length === 0 || !broughtBy) {
            toast.error("Customer name, brought by, and at least one item are required");
            return;
        }

        try {
            await addDoc(collection(db, "orders"), {
                userName: customerName,
                userId: "offline_customer",
                email: "N/A",
                items: cartItems,
                total: orderTotal,
                status: "delivered", // Usually offline orders are immediate
                paymentMethod: paymentMethod,
                broughtBy: broughtBy,
                source: "offline",
                isPaid: true,
                createdAt: serverTimestamp(),
            });
            toast.success("Offline order added successfully");
            setIsOfflineModalOpen(false);
            setCustomerName("");
            setBroughtBy("");
            setCartItems([]);
            setPaymentMethod("cash");
            fetchOrders();
        } catch (error) {
            console.error("Error adding offline order:", error);
            toast.error("Failed to add order");
        }
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    // Stats Calculations
    const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
    const offlineRevenue = orders.filter(o => o.source === 'offline').reduce((acc, curr) => acc + (curr.total || 0), 0);
    const onlineRevenue = totalRevenue - offlineRevenue;



    // Calculate Sales by Product
    const salesByProduct = useMemo(() => {
        const stats = {};
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const itemName = item.name || "Unknown Item";
                    if (!stats[itemName]) {
                        stats[itemName] = { name: itemName, quantity: 0 };
                    }
                    stats[itemName].quantity += (parseInt(item.quantity) || 0);
                });
            }
        });
        return Object.values(stats).sort((a, b) => b.quantity - a.quantity);
    }, [orders]);

    const maxProductQty = salesByProduct.length > 0 ? salesByProduct[0].quantity : 0;

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }



    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                    <div className="flex gap-2">
                        <Button onClick={() => setIsOfflineModalOpen(true)} className="bg-slate-900 text-white">
                            <Plus className="w-4 h-4 mr-2" /> Add Offline Order
                        </Button>
                        <Button onClick={fetchOrders} variant="outline" size="sm">
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{orders.length}</div>
                            <p className="text-xs text-slate-400 mt-1">
                                {orders.filter(o => o.source === 'offline').length} Offline • {orders.filter(o => o.source !== 'offline').length} Online
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Online Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">₹{onlineRevenue}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Offline Revenue (Cash/UPI)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">₹{offlineRevenue}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">TOTAL REVENUE</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">₹{totalRevenue}</div>
                        </CardContent>
                    </Card>
                </div>



                {/* Sales by Product Chart */}
                {salesByProduct.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Sales Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {salesByProduct.map((product) => (
                                    <div key={product.name} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium truncate pr-4">{product.name}</span>
                                            <span className="text-slate-500 shrink-0">{product.quantity} sold</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{ width: `${(product.quantity / maxProductQty) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Brought By</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Pay Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-mono text-xs text-slate-400">{order.id.slice(0, 6)}...</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{order.userName || "Guest"}</span>
                                                <span className="text-xs text-slate-500">{order.userId !== 'offline_customer' ? order.userId : 'In-Store'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-slate-600">
                                            {order.broughtBy || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {order.source === 'offline' ?
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Offline</Badge> :
                                                <Badge variant="outline">Online</Badge>
                                            }
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            {order.createdAt?.seconds
                                                ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 max-w-[200px]">
                                                {order.items?.map((item, idx) => (
                                                    <span key={idx} className="text-xs text-slate-600 truncate">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold">₹{order.total}</TableCell>
                                        <TableCell className="text-xs capitalize">{order.paymentMethod || 'Online'}</TableCell>
                                        <TableCell>
                                            <Badge className={`${statusColors[order.status] || "bg-gray-100"} hover:${statusColors[order.status] || "bg-gray-100"}`}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Select
                                                defaultValue={order.status}
                                                onValueChange={(val) => updateStatus(order.id, val)}
                                            >
                                                <SelectTrigger className="w-[110px] h-8 text-xs">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="processing">Processing</SelectItem>
                                                    <SelectItem value="shipped">Shipped</SelectItem>
                                                    <SelectItem value="delivered">Delivered</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteOrder(order.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* OFFLINE ORDER MODAL */}
            {isOfflineModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Plus className="w-5 h-5 text-amber-500" /> New Offline Order
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsOfflineModalOpen(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customerName" className="font-bold">Customer Name</Label>
                                    <Input
                                        id="customerName"
                                        placeholder="Enter customer name..."
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="bg-slate-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="broughtBy" className="font-bold">Brought By</Label>
                                    <Select value={broughtBy} onValueChange={setBroughtBy}>
                                        <SelectTrigger className="bg-slate-50/50">
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Arghya">Arghya</SelectItem>
                                            <SelectItem value="Arnab">Arnab</SelectItem>
                                            <SelectItem value="Souratya">Souratya</SelectItem>
                                            <SelectItem value="Maam">Maam</SelectItem>
                                            <SelectItem value="NirbanDa">NirbanDa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* 2. Add Items Section */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                                <Label className="font-bold flex items-center gap-2 text-slate-700">
                                    <ShoppingCart className="w-4 h-4" /> Add Items
                                </Label>

                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-12 md:col-span-6">
                                        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Select Product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="custom">-- Custom Item --</SelectItem>
                                                {PRODUCTS.map(p => (
                                                    <SelectItem key={p.id} value={p.id.toString()}>
                                                        {p.name} (₹{p.price})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedProductId === 'custom' && (
                                        <div className="col-span-12 md:col-span-6">
                                            <Input
                                                placeholder="Item Name"
                                                value={customItemName}
                                                onChange={(e) => setCustomItemName(e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>
                                    )}

                                    <div className="col-span-4 md:col-span-2">
                                        <Input
                                            type="number"
                                            placeholder="Qty"
                                            min="1"
                                            value={itemQty}
                                            onChange={(e) => setItemQty(e.target.value)}
                                            className="bg-white text-center"
                                        />
                                    </div>

                                    {selectedProductId === 'custom' ? (
                                        <div className="col-span-4 md:col-span-2">
                                            <Input
                                                type="number"
                                                placeholder="₹ Price"
                                                value={manualPrice}
                                                onChange={(e) => setManualPrice(e.target.value)}
                                                className="bg-white text-center"
                                            />
                                        </div>
                                    ) : (
                                        <div className="col-span-4 md:col-span-2 flex items-center justify-center font-bold text-slate-600 bg-white border rounded text-xs">
                                            {selectedProductId ? `₹${PRODUCTS.find(p => p.id == selectedProductId)?.price}` : '-'}
                                        </div>
                                    )}

                                    <div className="col-span-4 md:col-span-2">
                                        <Button onClick={handleAddItem} disabled={!selectedProductId} size="sm" className="w-full bg-slate-900 text-white h-10">
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Cart Summary */}
                            {cartItems.length > 0 && (
                                <div className="border rounded-md overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-100 text-slate-600 font-semibold">
                                            <tr>
                                                <th className="px-4 py-2">Item</th>
                                                <th className="px-4 py-2 text-center">Qty</th>
                                                <th className="px-4 py-2 text-right">Price</th>
                                                <th className="px-4 py-2 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, idx) => (
                                                <tr key={idx} className="border-t border-slate-100">
                                                    <td className="px-4 py-2 font-medium">{item.name}</td>
                                                    <td className="px-4 py-2 text-center text-slate-500">x{item.quantity}</td>
                                                    <td className="px-4 py-2 text-right">₹{item.price * item.quantity}</td>
                                                    <td className="px-4 py-2">
                                                        <button onClick={() => removeCartItem(idx)} className="text-red-400 hover:text-red-600">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-slate-50 border-t-2 border-slate-200">
                                                <td colSpan="2" className="px-4 py-3 font-bold text-right text-slate-700">Total Amount:</td>
                                                <td className="px-4 py-3 font-bold text-right text-lg text-slate-900">₹{orderTotal}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* 4. Payment Method & Submit */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <Label className="font-bold">Payment Method</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cash' ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                        <Wallet className="w-5 h-5" />
                                        <span className="text-xs font-bold">Cash Received</span>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod('online')}
                                        className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'online' ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span className="text-xs font-bold">Online / UPI</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAddOfflineOrder}
                                    className="w-full h-12 text-base bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg mt-4"
                                    disabled={cartItems.length === 0 || !customerName}
                                >
                                    Confirm Order (₹{orderTotal})
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
