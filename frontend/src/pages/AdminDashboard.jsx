import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/auth-context";
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
  const { user, userData, token, loading: authLoading } = useAuth();
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

  useEffect(() => {
    if (!authLoading) {
      if (!user || userData?.role !== "admin") {
        navigate("/");
        toast.error("Access denied. Admin only.");
      } else {
        fetchOrders();
      }
    }
  }, [user, userData, authLoading, navigate]);

  const fetchOrders = async () => {
    try {
      if (!token) return;
      const response = await fetch("http://localhost:5000/api/orders/admin", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const resData = await response.json();
      if (resData.success) {
        setOrders(resData.data);
      } else {
        toast.error(resData.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const resData = await response.json();
      
      if (resData.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      } else {
        toast.error(resData.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This cannot be undone.")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const resData = await response.json();

      if (resData.success) {
        toast.success("Order deleted successfully");
        fetchOrders();
      } else {
        toast.error(resData.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  // --- Offline Order Logic ---
  const orderTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const handleAddItem = (e) => {
    e.preventDefault();
    let newItem = null;

    if (selectedProductId && selectedProductId !== "custom") {
      const product = PRODUCTS.find(p => p.id.toString() === selectedProductId.toString());
      if (product) {
        newItem = {
          productId: product.id.toString(),
          name: product.name,
          price: product.price,
          quantity: parseInt(itemQty)
        };
      }
    } else if (customItemName && manualPrice) {
      newItem = {
        productId: `custom_${Date.now()}`,
        name: customItemName,
        price: parseFloat(manualPrice),
        quantity: parseInt(itemQty)
      };
    }

    if (newItem) {
      setCartItems([...cartItems, newItem]);
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
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: orderTotal,
          deliveryAddress: {
            addressLine: `Offline Order - Brought by ${broughtBy} (Paid via ${paymentMethod})`
          }
        })
      });
      const resData = await response.json();

      if (resData.success) {
        toast.success("Offline order added successfully");
        setIsOfflineModalOpen(false);
        setCustomerName("");
        setBroughtBy("");
        setCartItems([]);
        setPaymentMethod("cash");
        fetchOrders();
      } else {
        toast.error(resData.message || "Failed to add order");
      }
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

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  
  // Stats Calculations
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
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Admin Console</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsOfflineModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold uppercase tracking-wider text-xs">
              <Plus className="w-4 h-4 mr-2" /> Add Offline Order
            </Button>
            <Button onClick={fetchOrders} variant="outline" size="sm" className="rounded-full font-bold text-xs uppercase tracking-wider">
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Registered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono font-black text-slate-800">{orders.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">LOGGED REVENUE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono font-black text-emerald-600">₹{totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart */}
        {salesByProduct.length > 0 && (
          <Card className="shadow-sm border-slate-100">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase text-slate-800 tracking-wider">Product Sales Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByProduct.map((product) => (
                  <div key={product.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span className="truncate pr-4">{product.name}</span>
                      <span className="text-slate-500 shrink-0">{product.quantity} units</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-850 rounded-full"
                        style={{ width: `${(product.quantity / maxProductQty) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Table */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase text-slate-800 tracking-wider">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Order Number</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Customer Details</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Address / Contact</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Date</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Order Items</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Total Price</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Status</TableHead>
                  <TableHead className="font-bold text-xs uppercase text-slate-400">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const itemsSummary = order.items && order.items.length > 0 
                    ? order.items 
                    : (order.isCustom ? [{ quantity: 1, name: `Custom: ${order.customSpecs?.material} (${order.customSpecs?.size}cm)` }] : []);

                  return (
                    <TableRow key={order.id || order._id}>
                      <TableCell className="font-mono text-xs font-bold text-slate-600">{order.orderNumber || "PMX-TEMP"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-sm text-slate-800">{order.user?.name || "Guest Customer"}</span>
                          <span className="text-xs text-slate-400">{order.user?.email || "Guest Email"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-600 text-left max-w-[200px] truncate">
                        {order.deliveryAddress?.phone && <span className="block">📞 {order.deliveryAddress.phone}</span>}
                        <span className="block text-slate-450 font-semibold">{order.deliveryAddress?.addressLine || "-"}</span>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 max-w-[200px] text-left">
                          {itemsSummary.map((item, idx) => (
                            <span key={idx} className="text-xs font-semibold text-slate-500 truncate">
                              {item.quantity}x {item.name}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-900 font-mono">₹{order.totalAmount}</TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[order.status] || "bg-gray-100"} hover:${statusColors[order.status] || "bg-gray-100"} text-[10px] font-bold uppercase rounded`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            defaultValue={order.status}
                            onValueChange={(val) => updateStatus(order.id || order._id, val)}
                          >
                            <SelectTrigger className="w-[110px] h-8 text-xs font-bold rounded-lg border-slate-200">
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

                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteOrder(order.id || order._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* OFFLINE ORDER MODAL */}
      {isOfflineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden my-8 border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" /> New Offline Order
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOfflineModalOpen(false)} className="cursor-pointer border-0 bg-transparent">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-slate-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="broughtBy" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Brought By</Label>
                  <Select value={broughtBy} onValueChange={setBroughtBy}>
                    <SelectTrigger className="bg-slate-50/50 font-bold text-xs h-10">
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

              {/* Add Items Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <Label className="text-[10px] font-black uppercase text-slate-450 tracking-wider flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-slate-500" /> Add Items
                </Label>

                <div className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-12 md:col-span-6">
                    <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                      <SelectTrigger className="bg-white font-semibold text-xs h-9">
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
                        className="bg-white h-9"
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
                      className="bg-white text-center h-9"
                    />
                  </div>

                  {selectedProductId === 'custom' ? (
                    <div className="col-span-4 md:col-span-2">
                      <Input
                        type="number"
                        placeholder="₹ Price"
                        value={manualPrice}
                        onChange={(e) => setManualPrice(e.target.value)}
                        className="bg-white text-center h-9"
                      />
                    </div>
                  ) : (
                    <div className="col-span-4 md:col-span-2 flex items-center justify-center font-bold text-slate-600 bg-white border rounded text-xs h-9">
                      {selectedProductId ? `₹${PRODUCTS.find(p => p.id == selectedProductId)?.price}` : '-'}
                    </div>
                  )}

                  <div className="col-span-4 md:col-span-2">
                    <Button onClick={handleAddItem} disabled={!selectedProductId} size="sm" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-9 text-xs font-bold uppercase rounded-lg border-0 cursor-pointer">
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5">Item</th>
                        <th className="px-4 py-2.5 text-center">Qty</th>
                        <th className="px-4 py-2.5 text-right">Price</th>
                        <th className="px-4 py-2.5 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, idx) => (
                        <tr key={idx} className="border-t border-slate-100">
                          <td className="px-4 py-2.5 font-bold text-slate-700">{item.name}</td>
                          <td className="px-4 py-2.5 text-center text-slate-500 font-bold">x{item.quantity}</td>
                          <td className="px-4 py-2.5 text-right font-mono font-bold">₹{item.price * item.quantity}</td>
                          <td className="px-4 py-2.5">
                            <button onClick={() => removeCartItem(idx)} className="text-red-400 hover:text-red-600 border-0 bg-transparent cursor-pointer">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 border-t-2 border-slate-200">
                        <td colSpan="2" className="px-4 py-3 font-black text-right text-slate-500 uppercase tracking-wider">Total Amount:</td>
                        <td className="px-4 py-3 font-mono font-black text-right text-base text-slate-900">₹{orderTotal}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Payment Method & Submit */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Payment Method</Label>
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
                  className="w-full h-11 text-xs font-bold uppercase tracking-widest bg-zinc-950 hover:bg-zinc-800 text-white rounded-full shadow-md mt-4 border-0 cursor-pointer"
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
