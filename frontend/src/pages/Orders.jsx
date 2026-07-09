import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const { user: currentUser, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!currentUser || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const resData = await response.json();
        
        if (resData.success) {
          setOrders(resData.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [currentUser, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-white text-slate-900">
        <Package className="w-12 h-12 mb-4 text-slate-300 animate-pulse" />
        <h2 className="text-xl font-black mb-2 uppercase tracking-wider">No orders found</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-xs font-semibold">
          You haven't logged any custom order print consultations yet.
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-full px-8 bg-zinc-950 hover:bg-zinc-800 text-white uppercase font-bold tracking-widest text-xs border-0 cursor-pointer h-11">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] text-slate-900 pb-20 pt-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8">My Consultation Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const itemsList = order.items && order.items.length > 0 
              ? order.items 
              : (order.isCustom ? [{ quantity: 1, name: `Custom Print: ${order.customSpecs?.material} (${order.customSpecs?.size}cm)` }] : []);

            return (
              <div key={order._id || order.id} className="bg-white border border-slate-100 p-5 md:p-6 rounded-xl shadow-sm text-left">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-slate-800 font-mono">{order.orderNumber || "PMX-TEMP"}</span>
                      <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase mt-1.5">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-[9px] font-black uppercase text-slate-400">Total Value</div>
                    <div className="text-lg font-black text-slate-900 font-mono">₹{order.totalAmount}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {itemsList.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center rounded-lg">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 leading-tight">{item.name}</h4>
                        <p className="text-[10px] text-slate-450 mt-0.5 font-semibold uppercase">Quantity: {item.quantity}</p>
                      </div>
                      <div className="ml-auto font-mono text-xs font-bold text-slate-900">
                        {item.price > 0 ? `₹${item.price * item.quantity}` : "Quote Pending"}
                      </div>
                    </div>
                  ))}
                </div>

                {order.deliveryAddress?.addressLine && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] font-semibold text-slate-400">
                    <span className="font-black uppercase text-slate-550 block mb-1">Shipping details / Consultation Notes</span>
                    <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{order.deliveryAddress.addressLine}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
