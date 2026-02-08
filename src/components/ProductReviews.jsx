import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export function ProductReviews({ productId }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check if current user is admin
    const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

    useEffect(() => {
        if (!productId) return;

        // Real-time listener for reviews
        const q = query(
            collection(db, "reviews"),
            where("productId", "==", productId)
            // orderBy("createdAt", "desc") // Requires index, doing client-side sort instead
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reviewsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Client-side sort
            reviewsData.sort((a, b) => {
                const timeA = a.createdAt?.toMillis() || 0;
                const timeB = b.createdAt?.toMillis() || 0;
                return timeB - timeA;
            });

            setReviews(reviewsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please sign in to post a review");
            return;
        }
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            await addDoc(collection(db, "reviews"), {
                productId,
                userId: user.uid,
                userName: user.displayName || "Anonymous",
                userAvatar: user.photoURL || "",
                comment: newComment.trim(),
                createdAt: serverTimestamp(),
            });
            setNewComment("");
            toast.success("Review posted!");
        } catch (error) {
            console.error("Error posting review:", error);
            toast.error("Failed to post review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) return;
        try {
            await deleteDoc(doc(db, "reviews", reviewId));
            toast.success("Review deleted");
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete review");
        }
    };

    return (
        <div className="mt-16 border-t border-slate-100 pt-10">
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                Customer Reviews ({reviews.length})
            </h3>

            {/* Review Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-12 bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <div className="flex gap-4 mb-4">
                        <Avatar className="w-10 h-10 border border-slate-200">
                            <AvatarImage src={user.photoURL} />
                            <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">
                                {user.displayName?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm mb-1">{user.displayName || "You"}</p>
                            <Textarea
                                placeholder="Share your thoughts about this product..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="bg-white border-slate-200 focus:border-amber-500 min-h-[100px] text-slate-700"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={submitting || !newComment.trim()}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Post Review
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="mb-12 p-6 bg-slate-50 border border-slate-100 rounded-lg text-center">
                    <p className="text-slate-600 mb-4">Please sign in to leave a review.</p>
                    {/* The AuthModal context isn't directly exposed here easily without prop drilling or context hook triggers. 
                Ideally we use a global openAuthModal function or just tell them to sign in at header. 
                For now, simple message. */}
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-300" />
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-slate-500 italic text-center py-8">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="flex gap-4 group">
                            <Avatar className="w-10 h-10 border border-slate-100 mt-1">
                                <AvatarImage src={review.userAvatar} />
                                <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">
                                    {review.userName?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">{review.userName}</span>
                                        <span className="text-xs text-slate-400">
                                            {review.createdAt ? formatDistanceToNow(review.createdAt.toDate(), { addSuffix: true }) : "Just now"}
                                        </span>
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                                            title="Delete Review (Admin Only)"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
