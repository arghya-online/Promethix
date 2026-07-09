import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password, phone, address);
      }
      onClose();
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative border border-slate-100 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 border-0 bg-transparent cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-black text-slate-900 mb-6 text-center uppercase tracking-wider">
              {isLogin ? "Sign In" : "Register Profile"}
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-xs font-bold mb-4" role="alert">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="phone" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">WhatsApp Phone</Label>
                      <Input
                        id="phone"
                        type="text"
                        placeholder="e.g. 9832769269"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Delivery Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="e.g. Kolkata, WB"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="email" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-xs h-10 mt-2 rounded-full cursor-pointer border-0" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs font-semibold">
              <span className="text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-slate-900 hover:underline border-0 bg-transparent cursor-pointer"
              >
                {isLogin ? "Register Now" : "Sign In"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
