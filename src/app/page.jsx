import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (session?.user?.isAdmin) redirect("/admin");
  if (session?.user) redirect("/workspace");

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 sm:pt-28 lg:pt-0">
      {/* Background Decorative Glow */}
      <div className="absolute top-[-5%] left-[-10%] w-[80%] sm:w-[70%] lg:w-[40%] h-[35%] sm:h-[40%] bg-accent/10 blur-[60px] sm:blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[70%] sm:w-[60%] lg:w-[30%] h-[25%] sm:h-[30%] bg-accent-2/10 blur-[50px] sm:blur-[70px] lg:blur-[100px] rounded-full pointer-events-none" />

      <main className="container-custom relative z-10 min-h-screen flex items-center py-12 sm:py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 xl:gap-32 items-center w-full">
          
          {/* Text Content */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
              
              {/* Badge */}
              <div className="reveal-up inline-block">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] sm:text-[10px] lg:text-sm font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] lg:tracking-[0.4em] text-accent">
                  Creative Digital Agency
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-balance reveal-up leading-[1.05]">
                Realizing Your <br />
                <span className="text-accent italic font-black">Biggest Ideas.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-textSoft leading-relaxed max-w-sm sm:max-w-md lg:max-w-xl reveal-up stagger-1">
                We transform visionary concepts into digital masterworks.
                Where high-end design meets cutting-edge execution.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 w-full sm:w-auto">
              <button className="btn-primary group reveal-up stagger-2 w-full xs:w-auto">
                <span className="relative z-10 px-4 sm:px-6">Start Project</span>
              </button>
              <button className="btn-secondary reveal-up stagger-3 w-full xs:w-auto">
                View Showcase
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-6 sm:pt-8 border-t border-white/5 reveal-up stagger-4 w-full">
              <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-sm h-7 sm:h-8 lg:h-10">
                  <Image
                    src="/brands.png"
                    alt="Trusted brands"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Asset */}
          <div className="relative order-1 lg:order-2 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
            <div className="relative aspect-square lg:h-[580px] xl:h-[700px] w-full flex items-center justify-center group lg:translate-x-10 xl:translate-x-20 reveal-up">
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                <Image
                  src="/hero1.jpeg"
                  alt="Hero illustration"
                  fill
                  className="object-contain scale-110 lg:scale-125 rounded-md mix-blend-screen"
                  priority
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 sm:-bottom-6 lg:bottom-16 left-1/2 lg:-left-10 xl:-left-20 -translate-x-1/2 lg:translate-x-0 glass px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-8 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] shadow-2xl reveal-up border-white/10 z-20 whitespace-nowrap">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="text-xl sm:text-2xl lg:text-4xl font-black text-accent tracking-tighter">100+</div>
                <div className="h-5 sm:h-6 lg:h-8 w-[1px] bg-white/10" />
                <div className="text-[7px] sm:text-[8px] lg:text-[10px] font-black text-muted uppercase tracking-[0.2em] leading-tight">
                  ELITE <br /> PROJECTS
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;
