"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { UsersSkeleton } from "@/components/skeletons/skeletons";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, id: null });

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (id) => setModalConfig({ isOpen: true, id });
  const closeModal = () => setModalConfig({ isOpen: false, id: null });

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append("id", modalConfig.id);
    await deleteUser(formData);
    fetchUsers();
  };

  if (loading) return <UsersSkeleton />;

  return (
    <div className="h-full">
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Revoke Authority"
        message="Are you sure you want to revoke this member's authority? This will permanently remove their access."
      />

      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 lg:mb-10">
        <h3 className="text-base sm:text-lg lg:text-xl font-black italic tracking-tighter uppercase text-white">
          Member Registry.
        </h3>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-white/5 flex-shrink-0">
          {users.length} ENTITIES
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 sm:py-16 lg:py-20 border border-dashed border-white/5 rounded-2xl sm:rounded-3xl">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
            No entities recorded.
          </p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[450px] lg:max-h-[500px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-white/[0.02] rounded-xl sm:rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 min-w-0">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-full overflow-hidden glass border-white/10">
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt={user.username}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors truncate">
                      {user.username}
                    </h4>
                    {user.isAdmin && (
                      <span className="text-[7px] sm:text-[8px] font-black tracking-[0.2em] bg-accent/20 text-accent px-1.5 sm:px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[8px] sm:text-[9px] font-bold text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5 sm:mt-1 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div>
                <button
                  onClick={() => !user.isAdmin && openModal(user._id)}
                  disabled={user.isAdmin}
                  className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full transition-all flex-shrink-0 whitespace-nowrap ${
                    user.isAdmin
                      ? "text-muted border border-white/5 cursor-not-allowed"
                      : "text-red-400 hover:text-white hover:bg-red-400/20"
                  }`}
                >
                  {user.isAdmin ? "Secured" : "Revoke"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;