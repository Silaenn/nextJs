"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { UsersSkeleton } from "@/components/skeletons/skeletons";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <UsersSkeleton />;

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Member Registry.</h3>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent glass px-4 py-2 rounded-full border-white/5">
          {users.length} ENTITIES
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">No entities recorded.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
          {users.map((user) => (
            <div 
              key={user._id}
              className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-6 min-w-0">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden glass border-white/10">
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt={user.username}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors truncate">
                      {user.username}
                    </h4>
                    {user.isAdmin && (
                      <span className="text-[8px] font-black tracking-[0.2em] bg-accent/20 text-accent px-2 py-0.5 rounded-full uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mt-1 truncate">{user.email}</p>
                </div>
              </div>
              <form action={deleteUser}>
                <input type="hidden" name="id" value={user._id} />
                <button 
                  type="submit"
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all ${
                    user.isAdmin 
                    ? "text-muted border border-white/5 cursor-not-allowed" 
                    : "text-red-400 hover:text-white hover:bg-red-400/20"
                  }`}
                  disabled={user.isAdmin}
                >
                  {user.isAdmin ? 'Secured' : 'Revoke'}
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
