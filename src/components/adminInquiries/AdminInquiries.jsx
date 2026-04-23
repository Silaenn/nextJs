"use client";

import { useState, useEffect } from "react";
import { InquirySkeleton } from "@/components/skeletons/skeletons";
import { updateInquiryStatus, deleteInquiry } from "@/lib/action";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="h-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Client Intel.</h3>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent glass px-4 py-2 rounded-full border-white/5">
          {inquiries.length} SIGNALS
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">No signals detected.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors">{inquiry.name}</h4>
                <form action={async (formData) => {
                    await deleteInquiry(formData);
                    fetchInquiries();
                }}>
                    <input type="hidden" name="id" value={inquiry._id} />
                    <button className="text-[10px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-colors">Terminate</button>
                </form>
              </div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 opacity-60">{inquiry.email}</p>
              <div className="text-sm text-textSoft leading-relaxed font-medium mb-6 line-clamp-4 italic">
                &quot;{inquiry.message}&quot;
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {["PENDING", "IN PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
                    <form key={s} action={async (formData) => {
                        await updateInquiryStatus(formData);
                        fetchInquiries();
                    }}>
                        <input type="hidden" name="id" value={inquiry._id} />
                        <input type="hidden" name="status" value={s} />
                        <button 
                            className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
