import { Inquiry } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

const AdminInquiries = async () => {
  await connectToDb();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });

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
                <span className="text-[9px] font-bold text-muted uppercase tracking-[0.1em]">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 opacity-60">{inquiry.email}</p>
              <div className="text-sm text-textSoft leading-relaxed font-medium mb-6 line-clamp-4 italic">
                &quot;{inquiry.message}&quot;
              </div>
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/5" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">
                  {inquiry.status || "PENDING"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
