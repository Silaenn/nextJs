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
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Case Inventory.</h3>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent glass px-4 py-2 rounded-full border-white/5">
          {posts.length} ASSETS
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">No data archived.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
          {posts.map((post) => (
            <div 
              key={post._id}
              className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-6 min-w-0">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden glass border-white/10">
                  <Image
                    src={post.img || "/noavatar.png"}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <form action={deletePost}>
                <input type="hidden" name="id" value={post._id} />
                <button 
                  type="submit"
                  className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-white hover:bg-red-400/20 rounded-full transition-all"
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
