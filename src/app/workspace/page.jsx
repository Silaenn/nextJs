import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ContactForm from "@/components/contactForm/ContactForm";
import TransmissionArchive from "@/components/transmissionArchive/TransmissionArchive";

const WorkspacePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.isAdmin) redirect("/admin");

  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-accent/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header Section */}
        <div className="mb-14 sm:mb-20 lg:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 lg:gap-12">
          
          {/* Title */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border-white/10 text-accent text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 reveal-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Operational Hub
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] italic uppercase mb-6 sm:mb-8 lg:mb-10 reveal-up">
              Elevate Your <br />
              <span className="text-accent">Vision.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-textSoft/80 font-medium leading-relaxed max-w-xl reveal-up">
              Welcome back,{" "}
              <span className="text-white font-bold">{session.user.username}</span>.
              Access your exclusive workspace to collaborate with our master engineers.
            </p>
          </div>

          {/* User Card */}
          <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] border-white/5 flex items-center gap-4 sm:gap-6 shadow-2xl reveal-up w-full lg:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-surface-2 flex items-center justify-center text-white font-black text-2xl sm:text-3xl border border-white/10 shadow-inner flex-shrink-0">
              {session.user.username?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-1">
                Authenticated User
              </p>
              <p className="font-black text-lg sm:text-xl leading-none mb-1.5 sm:mb-2 text-white italic tracking-tighter uppercase truncate">
                {session.user.username}
              </p>
              <p className="text-[10px] sm:text-xs text-muted font-medium tracking-widest uppercase truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:space-y-12">

            {/* Contact Form Card */}
            <div className="glass p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] border-white/5 relative overflow-hidden group reveal-up">
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
                  <div className="w-8 sm:w-12 h-[1px] bg-accent" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent">
                    Submit Protocol
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3 sm:mb-4 lg:mb-6">
                  Propose Artifact
                </h2>
                <p className="text-sm sm:text-base text-textSoft font-medium leading-relaxed mb-8 sm:mb-10 lg:mb-12">
                  Have a breakthrough concept? Securely transmit your vision to our engineering sector.
                </p>
                <ContactForm 
                  userId={session.user.id} 
                  initialName={session.user.username}
                  initialEmail={session.user.email}
                />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-accent/10" />
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Elite Support", desc: "Priority Access", icon: "⚡" },
                { label: "Engineering", desc: "Master Class", icon: "🧠" },
                { label: "Prototypes", desc: "Rapid Sync", icon: "🗺️" },
                { label: "Security", desc: "Encrypted", icon: "🔒" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-[1.5rem] lg:rounded-[2rem] reveal-up border-white/5 group hover:border-accent/20 transition-all duration-500"
                >
                  <span className="text-2xl sm:text-3xl mb-4 sm:mb-5 lg:mb-6 block grayscale group-hover:grayscale-0 transition-all">
                    {item.icon}
                  </span>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white mb-1">
                    {item.label}
                  </p>
                  <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Transmission Archive */}
          <TransmissionArchive userId={session.user.id} />
        </div>

      </div>
    </div>
  );
};

export default WorkspacePage;