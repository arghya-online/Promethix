import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_REVIEWS = [
  {
    id: "rev_1",
    userName: "Souratya Sen",
    userAvatar: "",
    comment: "Absolutely outstanding quality. The 0.1mm layer resolution makes the surface layers barely visible. Highly recommended!",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rev_2",
    userName: "Arnab Roy",
    userAvatar: "",
    comment: "Printed this in Laser Teal PETG. Sturdy, perfectly balanced, and matches the configurator specifications exactly. Extremely satisfied.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export function ProductReviews({ productId }) {
  const { user, userData } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdmin = userData?.role === "admin";

  useEffect(() => {
    if (!productId) return;
    
    // Load reviews from localStorage
    const localKey = `promethix_reviews_${productId}`;
    const stored = localStorage.getItem(localKey);
    
    try {
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        // Seed default mock reviews
        localStorage.setItem(localKey, JSON.stringify(DEFAULT_REVIEWS));
        setReviews(DEFAULT_REVIEWS);
      }
    } catch (e) {
      console.error("ProductReviews: Failed to parse reviews:", e);
      localStorage.setItem(localKey, JSON.stringify(DEFAULT_REVIEWS));
      setReviews(DEFAULT_REVIEWS);
    }
    setLoading(false);
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to post a review");
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    const localKey = `promethix_reviews_${productId}`;
    
    const newReview = {
      id: `rev_${Date.now()}`,
      userName: userData?.fullName || user.displayName || "Anonymous User",
      userAvatar: "",
      comment: newComment.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem(localKey, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setNewComment("");
    toast.success("Review posted!");
    setSubmitting(false);
  };

  const handleDelete = (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    const localKey = `promethix_reviews_${productId}`;
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    
    localStorage.setItem(localKey, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    toast.success("Review deleted");
  };

  return (
    <div className="mt-16 border-t border-slate-100 pt-10">
      <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-wider">
        <MessageSquare className="w-5 h-5 text-amber-600" />
        Customer Reviews ({reviews.length})
      </h3>

      {/* Review Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-12 bg-slate-50 p-5 rounded-xl border border-slate-150 text-left">
          <div className="flex gap-4 mb-4">
            <Avatar className="w-9 h-9 border border-slate-200">
              <AvatarFallback className="bg-slate-200 text-slate-600 font-bold text-xs">
                {(userData?.fullName || user.displayName || "U").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-xs mb-1.5">{userData?.fullName || user.displayName || "You"}</p>
              <Textarea
                placeholder="Share your thoughts about this product..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-white border-slate-200 focus:border-amber-500 min-h-[90px] text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white outline-none resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-full border-0 cursor-pointer h-9 px-5 shadow-sm"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2 inline" /> : null}
              Post Review
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-12 p-6 bg-slate-55/5 border border-dashed border-slate-200 rounded-xl text-center">
          <p className="text-slate-500 font-semibold text-xs">Please sign in to leave a review.</p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6 text-left">
        {loading ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-350" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-slate-400 italic text-center py-8 text-xs font-medium">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4 group">
              <Avatar className="w-9 h-9 border border-slate-100 mt-1">
                <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-xs">
                  {(review.userName || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{review.userName}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Just now"}
                    </span>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-slate-450 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 border-0 bg-transparent cursor-pointer"
                      title="Delete Review (Admin Only)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-slate-550 text-xs leading-relaxed font-medium">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
