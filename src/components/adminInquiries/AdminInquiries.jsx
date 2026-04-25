"use client";

import { useState, useEffect } from "react";
import { InquirySkeleton } from "@/components/skeletons/skeletons";
import { updateInquiryStatus, deleteInquiry } from "@/lib/action";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, id: null });

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const openModal = (id) => setModalConfig({ isOpen: true, id });
  const closeModal = () => setModalConfig({ isOpen: false, id: null });

  const handleConfirmDelete = async () => {
    const formData = new FormData();
    formData.append("id", modalConfig.id);
    await deleteInquiry(formData);
    fetchInquiries();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-500 bg-yellow-500/10";
      case "IN PROGRESS": return "text-accent bg-accent/10";
      case "COMPLETED": return "text-green-500 bg-green-500/10";
      case "CANCELLED": return "text-red-500 bg-red-500/10";
      default: return "text-muted bg-white/5";
    }
  };

  if (loading) return <InquirySkeleton />;

  return (
    <div className="h-full flex flex-col">
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Terminate Signal"
        message="Are you sure you want to permanently delete this client signal? This action cannot be undone."
      />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 flex-shrink-0">
        <h3 className="text-base sm:text-lg lg:text-xl font-black italic tracking-tighter uppercase text-white">
          Client Intel.
        </h3>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-white/5 flex-shrink-0">
          {inquiries.length} SIGNALS
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-2xl sm:rounded-3xl bg-white/[0.01]">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
            No signals detected.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="p-4 sm:p-5 lg:p-6 bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
            >
              {/* Name + Terminate */}
              <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors leading-snug">
                  {inquiry.name}
                </h4>
                <div>
                  <button 
                    onClick={() => openModal(inquiry._id)}
                    className="text-[9px] sm:text-[10px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-colors flex-shrink-0"
                  >
                    Terminate
                  </button>
                </div>
              </div>

              {/* Email */}
              <p className="text-[9px] sm:text-[10px] font-bold text-accent uppercase tracking-widest mb-3 sm:mb-4 opacity-60 truncate">
                {inquiry.email}
              </p>

              {/* Message */}
              <div className="text-xs sm:text-sm text-textSoft leading-relaxed font-medium mb-4 sm:mb-5 lg:mb-6 line-clamp-3 sm:line-clamp-4 italic">
                &quot;{inquiry.message}&quot;
              </div>

              {/* Status Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-none flex-nowrap">
                {["PENDING", "IN PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
                  <form
                    key={s}
                    action={async (formData) => {
                      await updateInquiryStatus(formData);
                      fetchInquiries();
                    }}
                  >
                    <input type="hidden" name="id" value={inquiry._id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        inquiry.status === s
                          ? getStatusColor(s) + " border border-current"
                          : "text-muted hover:text-white bg-white/5"
                      }`}
                    >
                      {s}
                    </button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;