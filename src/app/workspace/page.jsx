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
      case "pending": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "reviewed": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "accepted": return "bg-green-500/20 text-green-500 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <div className="container-custom py-12 animate-fadeIn relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>

      {/* Header Section */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Client Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
            Elevate Your <span className="text-gradient">Vision.</span>
          </h1>
          <p className="text-textSoft text-xl max-w-2xl leading-relaxed">
            Welcome back, <span className="text-white font-semibold underline decoration-primary/50 underline-offset-4">{session.user.username}</span>. 
            Your innovation starts here. Manage your ideas and track real-time progress.
          </p>
        </div>
        
        <div className="flex items-center gap-4 glass-card p-4 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            {session.user.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-lg leading-none mb-1">{session.user.username}</p>
            <p className="text-sm text-textSoft/60 font-medium">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 relative z-10">
        {/* Left Column (5/12) */}
        <div className="lg:col-span-5 space-y-10 animate-fadeInLeft" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-primary/30 transition-colors duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">Submit an Idea</h2>
              <p className="text-textSoft/70 mb-10 leading-relaxed text-lg">
                Have a breakthrough concept? Our team is ready to transform your vision into reality.
              </p>
              <ContactForm userId={session.user.id} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Priority Support", icon: "⚡" },
              { label: "Expert Strategy", icon: "🧠" },
              { label: "Full Roadmap", icon: "🗺️" },
              { label: "Direct Access", icon: "🔒" }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center text-center gap-3 glass-card-hover border-white/5">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-textSoft/80">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7/12) */}
        <div className="lg:col-span-7 space-y-10 animate-fadeInRight" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <div className="glass-card p-10 rounded-[2.5rem] min-h-[700px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                Message History
                <span className="text-sm font-normal text-textSoft/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {inquiries.length}
                </span>
              </h2>
            </div>

            <div className="flex-1 relative z-10">
              {inquiries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 animate-pulse-soft">
                    <svg className="w-10 h-10 text-textSoft/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">No interactions found</h3>
                  <p className="max-w-xs mx-auto text-textSoft/50 leading-relaxed">
                    Your collaboration history will appear here once you submit your first idea.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((inquiry, idx) => (
                    <div 
                      key={inquiry._id.toString()} 
                      className="group glass-card p-8 rounded-3xl border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.05]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </div>
                          <div className="h-1 w-1 rounded-full bg-white/20"></div>
                          <span className="text-xs font-bold text-textSoft/40 uppercase tracking-widest">
                            {new Date(inquiry.createdAt).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300 leading-snug">
                        {inquiry.message.length > 80 ? inquiry.message.substring(0, 80) + "..." : inquiry.message}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 text-xs font-medium text-textSoft/60">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSoft">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          {inquiry.name}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-textSoft/60">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSoft">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          {inquiry.email}
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
  );
};

export default WorkspacePage;
