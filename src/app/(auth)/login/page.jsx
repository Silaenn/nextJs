import LoginForm from "@/components/loginForm/loginForm";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-24 sm:py-28 lg:py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(54,115,253,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-custom max-w-6xl relative z-10 w-full">
        <div className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-white/5 shadow-2xl grid lg:grid-cols-2 min-h-[auto] lg:min-h-[700px]">

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
                  The Elite <br />
                  <span className="text-accent">Portal.</span>
                </h1>

                {/* Featured Image */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] xl:rounded-[2rem] overflow-hidden glass border-white/5 shadow-2xl mb-10 xl:mb-12 group">
                  <Image
                    src="/Pengeluaran.png"
                    alt="Workspace Preview"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>

                <p className="text-lg xl:text-xl text-textSoft font-medium leading-relaxed max-w-sm mb-10 xl:mb-12">
                  Access your exclusive workspace and collaborate with our
                  master engineers in real-time.
                </p>

                <div className="space-y-4 xl:space-y-6">
                  {["DIRECT ACCESS", "REAL-TIME SYNC", "ELITE SUPPORT"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all" />
                      <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
                        {item}
                      </span>
                    </div>
                  ))}
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
                Authentication
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white mb-3 sm:mb-4 italic uppercase">
                Welcome Back.
              </h2>
              <p className="text-sm sm:text-base text-textSoft font-medium">
                Verify your identity to proceed.
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 text-center">
              <p className="text-xs sm:text-sm text-textSoft font-medium">
                New visionary?{" "}
                <Link
                  href="/register"
                  className="text-white hover:text-accent font-black italic uppercase tracking-widest text-xs transition-colors ml-2"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;