import RegisterForm from "@/components/registerForm/registerForm";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(54,115,253,0.08)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container-custom max-w-6xl relative z-10">
        <div className="glass rounded-[3rem] overflow-hidden border-white/5 shadow-2xl grid lg:grid-cols-2 min-h-[750px]">
          
          {/* Left: Cinematic Marketing */}
          <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-surface">
            <div className="absolute top-0 left-0 w-full h-full opacity-40">
               <Image src="/Pengeluaran1.png" alt="Overlay" fill className="object-contain grayscale" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg/80 to-transparent" />

            <div className="relative z-10">
                <Link href="/" className="text-xl font-black italic tracking-tighter text-white mb-20 block">IDEA<span className="text-accent">REALITY.</span></Link>
                
                <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-white mb-12 uppercase italic">
                    New <br/>
                    <span className="text-accent">Identity.</span>
                </h1>
                
                <p className="text-xl text-textSoft font-medium leading-relaxed max-w-sm mb-12">
                    Join the digital vanguard. Secure your access to the most advanced creative workspace.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 glass rounded-2xl border-white/5">
                        <div className="text-2xl font-black text-accent mb-1 tracking-tighter">500+</div>
                        <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">ALLIES</div>
                    </div>
                    <div className="p-6 glass rounded-2xl border-white/5">
                        <div className="text-2xl font-black text-white mb-1 tracking-tighter">10Y+</div>
                        <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">LEGACY</div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-auto pt-10 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">© 2025 ELITE DIGITAL ARCHITECTURE</p>
            </div>
          </div>

          {/* Right: Premium Form */}
          <div className="p-10 md:p-20 flex flex-col justify-center bg-white/[0.01]">
            <div className="mb-12">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4 block">Registration</span>
                <h2 className="text-4xl font-black tracking-tighter text-white mb-4 italic uppercase">Get Started.</h2>
                <p className="text-textSoft font-medium">Create your credentials to join the elite.</p>
            </div>

            <RegisterForm />

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-sm text-textSoft font-medium">
                    Already an ally? {" "}
                    <Link href="/login" className="text-white hover:text-accent font-black italic uppercase tracking-widest text-xs transition-colors ml-2">
                        Sign In
                    </Link>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
