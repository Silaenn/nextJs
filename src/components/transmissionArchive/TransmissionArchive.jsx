"use client";
import { useState, useEffect } from "react";
import { TransmissionSkeleton } from "@/components/skeletons/skeletons";
import { deleteInquiry } from "@/lib/action";

const getStatusColor = (status) => {
  const s = status?.toUpperCase() || "PENDING";
  switch (s) {
    case "PENDING": return "text-yellow-500 border-yellow-500/20 bg-yellow-500/5";
    case "IN PROGRESS": return "text-accent border-accent/20 bg-accent/5";
    case "COMPLETED": return "text-green-500 border-green-500/20 bg-green-500/5";
    case "CANCELLED": return "text-red-500 border-red-500/20 bg-red-500/5";
    default: return "text-muted border-white/10 bg-white/5";
  }
};

const TransmissionArchive = ({ userId }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/inquiries?userId=${userId}`);
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
  }, [userId]);

  if (loading) {
    return (
      <div className="lg:col-span-7 glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border-white/5 bg-surface-2/20 h-[600px] sm:h-[800px] lg:h-[1130px] overflow-y-hidden">
        <TransmissionSkeleton />
      </div>
    );
  }

  return (
    <div className="lg:col-span-7">
      <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border-white/5 min-h-[500px] sm:min-h-[700px] lg:min-h-[1020px] flex flex-col overflow-hidden bg-surface-2/20">
        
        {/* Archive Header */}
        <div className="p-5 sm:p-7 lg:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />
            <h2 className="text-base sm:text-lg lg:text-xl font-black italic uppercase tracking-widest text-white truncate">
              Transmission Archive
            </h2>
          </div>
          <span className="glass px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black text-muted uppercase tracking-[0.2em] border-white/10 flex-shrink-0 ml-3">
            {inquiries.length} LOGS
          </span>
        </div>

        {/* Archive Body */}
        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-[500px] sm:max-h-[700px] lg:max-h-[1020px] scrollbar-custom">
          {inquiries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 sm:mb-8 lg:mb-10">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white mb-3 sm:mb-4">
                No Records Found
              </h3>
              <p className="max-w-[260px] sm:max-w-xs mx-auto text-textSoft font-medium leading-relaxed text-xs sm:text-sm">
                The archive is currently empty. Initiate a transmission to begin your collaboration history.
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry._id.toString()}
                  className="glass p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2.5rem] border-white/5 hover:border-accent/20 transition-all duration-500 hover:bg-white/[0.03] group"
                >
                  {/* Card Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                    
                    {/* Status + Date */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                      <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] border ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status || "PENDING"}
                      </div>
                      <div className="h-[1px] w-4 sm:w-6 bg-white/10 hidden sm:block" />
                      <span className="text-[9px] sm:text-[10px] font-black text-muted uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                        {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Sector + Cancel */}
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                      <div className="text-[8px] sm:text-[9px] font-black text-accent/50 uppercase tracking-widest hidden sm:block">
                        Sector: Global
                      </div>
                      {(inquiry.status?.toUpperCase() === "PENDING" || !inquiry.status) && (
                        <form
                          action={async (formData) => {
                            if (confirm("Are you sure you want to cancel this transmission?")) {
                              await deleteInquiry(formData);
                              fetchInquiries();
                            }
                          }}
                        >
                          <input type="hidden" name="id" value={inquiry._id} />
                          <button className="text-[9px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-all">
                            Cancel
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <h4 className="font-bold text-sm sm:text-base lg:text-xl text-white group-hover:text-accent transition-colors duration-500 leading-relaxed mb-4 sm:mb-6 lg:mb-8 italic">
                    &quot;{inquiry.message.length > 120
                      ? inquiry.message.substring(0, 120) + "..."
                      : inquiry.message}&quot;
                  </h4>

                  {/* Footer Meta */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-5 lg:pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-accent flex-shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted">
                        {inquiry.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-accent flex-shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted truncate">
                        {inquiry.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransmissionArchive;