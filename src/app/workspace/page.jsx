import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ContactForm from "@/components/contactForm/ContactForm";
import TransmissionArchive from "@/components/transmissionArchive/TransmissionArchive";

const WorkspacePage = async () => {
  const session = await auth();

  // Protect the route - only for non-admin clients
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8 reveal-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Operational Hub
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-[0.85] leading-[0.85] italic uppercase mb-10 reveal-up">
                    Elevate Your <br />
                    <span className="text-accent">Vision.</span>
                </h1>
                <p className="text-xl text-textSoft/80 font-medium leading-relaxed max-w-xl reveal-up">
                    Welcome back, <span className="text-white font-bold">{session.user.username}</span>. 
                    Access your exclusive workspace to collaborate with our master engineers.
                </p>
            </div>
            
            <div className="glass p-6 rounded-[2.5rem] border-white/5 flex items-center gap-6 shadow-2xl reveal-up">
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
                <div className="glass p-10 md:p-12 rounded-[3rem] border-white/5 relative overflow-hidden group reveal-up">
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

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Elite Support", desc: "Priority Access", icon: "⚡" },
                        { label: "Engineering", desc: "Master Class", icon: "🧠" },
                        { label: "Prototypes", desc: "Rapid Sync", icon: "🗺️" },
                        { label: "Security", desc: "Encrypted", icon: "🔒" }
                    ].map((item, i) => (
                        <div key={i} className="glass p-8 rounded-[2rem] reveal-up border-white/5 group hover:border-accent/20 transition-all duration-500">
                            <span className="text-3xl mb-6 block grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-1">{item.label}</p>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: History */}
            <TransmissionArchive userId={session.user.id} />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;