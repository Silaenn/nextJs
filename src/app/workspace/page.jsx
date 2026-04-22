import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ContactForm from "@/components/contactForm/ContactForm";
import { getInquiriesByUser } from "@/lib/data";

const WorkspacePage = async () => {
  const session = await auth();

  // Protect the route - only for non-admin clients
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isAdmin) {
    redirect("/admin");
  }

  const inquiries = await getInquiriesByUser(session.user.id);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-500 border-yellow-500/20 bg-yellow-500/5";
      case "reviewed": return "text-accent border-accent/20 bg-accent/5";
      case "accepted": return "text-green-500 border-green-500/20 bg-green-500/5";
      default: return "text-muted border-white/10 bg-white/5";
    }
  };

  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 reveal-up">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Operational Hub
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-[0.85] leading-[0.85] italic uppercase mb-10">
                    Elevate Your <br />
                    <span className="text-accent">Vision.</span>
                </h1>
                <p className="text-xl text-textSoft/80 font-medium leading-relaxed max-w-xl">
                    Welcome back, <span className="text-white font-bold">{session.user.username}</span>. 
                    Access your exclusive workspace to collaborate with our master engineers.
                </p>
            </div>
            
            <div className="glass p-6 rounded-[2.5rem] border-white/5 flex items-center gap-6 shadow-2xl">
                <div className="w-20 h-20 rounded-2xl bg-surface-2 flex items-center justify-center text-white font-black text-3xl border border-white/10 shadow-inner">
                    {session.user.username?.[0]?.toUpperCase()}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">Authenticated User</p>
                    <p className="font-black text-xl leading-none mb-2 text-white italic tracking-tighter uppercase">{session.user.username}</p>
                    <p className="text-xs text-muted font-medium tracking-widest uppercase">{session.user.email}</p>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Form & Features */}
            <div className="lg:col-span-5 space-y-12">
                <div className="glass p-10 md:p-12 rounded-[3rem] border-white/5 relative overflow-hidden group reveal-up stagger-1">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-[1px] bg-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Submit Protocol</span>
                        </div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">Propose Artifact</h2>
                        <p className="text-textSoft font-medium leading-relaxed mb-12">
                            Have a breakthrough concept? Securely transmit your vision to our engineering sector.
                        </p>
                        <ContactForm userId={session.user.id} />
                    </div>
                    {/* Inner Accent Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-accent/10" />
                </div>

                <div className="grid grid-cols-2 gap-4 reveal-up stagger-2">
                    {[
                        { label: "Elite Support", desc: "Priority Access", icon: "⚡" },
                        { label: "Engineering", desc: "Master Class", icon: "🧠" },
                        { label: "Prototypes", desc: "Rapid Sync", icon: "🗺️" },
                        { label: "Security", desc: "Encrypted", icon: "🔒" }
                    ].map((item, i) => (
                        <div key={i} className="glass p-8 rounded-[2rem] border-white/5 group hover:border-accent/20 transition-all duration-500">
                            <span className="text-3xl mb-6 block grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-1">{item.label}</p>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: History */}
            <div className="lg:col-span-7 reveal-up stagger-3">
                <div className="glass rounded-[3rem] border-white/5 min-h-[1150px] flex flex-col overflow-hidden bg-surface-2/20">
                    <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            <h2 className="text-xl font-black italic uppercase tracking-widest text-white">Transmission Archive</h2>
                        </div>
                        <span className="glass px-4 py-1.5 rounded-full text-[10px] font-black text-muted uppercase tracking-[0.2em] border-white/10">
                            {inquiries.length} LOGS
                        </span>
                    </div>

                    <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[1150px] scrollbar-custom">
                        {inquiries.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-10">
                                    <svg className="w-8 h-8 text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">No Records Found</h3>
                                <p className="max-w-xs mx-auto text-textSoft font-medium leading-relaxed text-sm">
                                    The archive is currently empty. Initiate a transmission to begin your collaboration history.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {inquiries.map((inquiry, idx) => (
                                    <div 
                                        key={inquiry._id.toString()} 
                                        className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-accent/20 transition-all duration-500 hover:bg-white/[0.03] group"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${getStatusColor(inquiry.status)}`}>
                                                    {inquiry.status}
                                                </div>
                                                <div className="h-[1px] w-6 bg-white/10" />
                                                <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                                                    {new Date(inquiry.createdAt).toLocaleDateString('en-US', { 
                                                        day: 'numeric', 
                                                        month: 'short', 
                                                        year: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                            <div className="text-[9px] font-black text-accent/50 uppercase tracking-widest">Sector: Global</div>
                                        </div>
                                        
                                        <h4 className="font-bold text-lg md:text-xl text-white group-hover:text-accent transition-colors duration-500 leading-relaxed mb-8 italic">
                                            &quot;{inquiry.message.length > 120 ? inquiry.message.substring(0, 120) + "..." : inquiry.message}&quot;
                                        </h4>
                                        
                                        <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted">{inquiry.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted">{inquiry.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
