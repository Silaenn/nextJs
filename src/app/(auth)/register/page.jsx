import RegisterForm from "@/components/registerForm/registerForm";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-24 sm:py-28 lg:py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(54,115,253,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-custom max-w-6xl relative z-10 w-full">
        <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-white/5 shadow-2xl grid lg:grid-cols-2 min-h-[auto] lg:min-h-[750px]">

          {/* Left: Cinematic Marketing — hidden on mobile */}
          <div className="hidden lg:flex flex-col p-12 xl:p-16 relative overflow-hidden bg-surface">
            <div className="relative z-10 flex flex-col h-full">
              <Link
                href="/"
                className="text-xl font-black italic tracking-tighter text-white mb-12 xl:mb-16 block"
              >
                IDEA<span className="text-accent">REALITY.</span>
              </Link>

              <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-white mb-6 xl:mb-8 uppercase italic">
                  New <br />
                  <span className="text-accent">Identity.</span>
                </h1>

                {/* Featured Image */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] xl:rounded-[2rem] overflow-hidden glass border-white/5 shadow-2xl mb-10 xl:mb-12 group">
                  <Image
                    src="/Pengeluaran1.png"
                    alt="Workspace Preview"
                    fill
                    className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                <p className="text-lg xl:text-xl text-textSoft font-medium leading-relaxed max-w-sm mb-10 xl:mb-12">
                  Join the digital vanguard. Secure your access to the most
                  advanced creative workspace.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                  <div className="p-4 xl:p-6 glass rounded-xl xl:rounded-2xl border-white/5">
                    <div className="text-xl xl:text-2xl font-black text-accent mb-1 tracking-tighter">500+</div>
                    <div className="text-[9px] xl:text-[10px] font-black text-muted uppercase tracking-[0.2em]">ALLIES</div>
                  </div>
                  <div className="p-4 xl:p-6 glass rounded-xl xl:rounded-2xl border-white/5">
                    <div className="text-xl xl:text-2xl font-black text-white mb-1 tracking-tighter">10Y+</div>
                    <div className="text-[9px] xl:text-[10px] font-black text-muted uppercase tracking-[0.2em]">LEGACY</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-8 xl:pt-10 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                  © 2025 ELITE DIGITAL ARCHITECTURE
                </p>
              </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
          </div>

          {/* Right: Form */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-12 xl:p-20 flex flex-col justify-center bg-white/[0.01]">

            {/* Mobile-only logo */}
            <Link
              href="/"
              className="lg:hidden text-xl font-black italic tracking-tighter text-white mb-8 block text-center"
            >
              IDEA<span className="text-accent">REALITY.</span>
            </Link>

            <div className="mb-8 sm:mb-10 lg:mb-12">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-3 sm:mb-4 block">
                Registration
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white mb-3 sm:mb-4 italic uppercase">
                Get Started.
              </h2>
              <p className="text-sm sm:text-base text-textSoft font-medium">
                Create your credentials to join the elite.
              </p>
            </div>

            <RegisterForm />

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 text-center">
              <p className="text-xs sm:text-sm text-textSoft font-medium">
                Already an ally?{" "}
                <Link
                  href="/login"
                  className="text-white hover:text-accent font-black italic uppercase tracking-widest text-xs transition-colors ml-2"
                >
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