"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { deletePost } from "@/lib/action";
import { PostsSkeleton } from "@/components/skeletons/skeletons";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/admin/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <PostsSkeleton />;

  return (
    <div className="h-full">

      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 lg:mb-10">
        <h3 className="text-base sm:text-lg lg:text-xl font-black italic tracking-tighter uppercase text-white">
          Case Inventory.
        </h3>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-white/5 flex-shrink-0">
          {posts.length} ASSETS
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 lg:py-20 border border-dashed border-white/5 rounded-2xl sm:rounded-3xl">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
            No data archived.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[450px] lg:max-h-[500px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white/[0.02] rounded-xl sm:rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
            >
              {/* Thumbnail + Info */}
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 min-w-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden glass border-white/10">
                  <Image
                    src={post.img || "/noavatar.png"}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-[8px] sm:text-[9px] font-bold text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5 sm:mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Delete */}
              <form action={deletePost}>
                <input type="hidden" name="id" value={post._id} />
                <button
                  type="submit"
                  className="px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-red-400 hover:text-white hover:bg-red-400/20 rounded-full transition-all flex-shrink-0 whitespace-nowrap"
                >
                  Terminate
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;