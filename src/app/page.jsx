import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkspacePage from "./workspace/page";

const Home = async () => {
  const session = await auth();

  if (session?.user?.isAdmin) {
    redirect("/admin");
  }

  if (session?.user) {
    redirect("/workspace");
  }

  return (
    <div className="relative overflow-hidden min-h-screen pt-40 lg:pt-32">
      {/* Background Decorative Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-2/10 blur-[100px] rounded-full pointer-events-none" />

      <main className="container-custom relative z-10 min-h-[calc(100vh-200px)] flex items-center py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-72 items-center w-full">
          {/* Text Content */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <div className="reveal-up inline-block">
                <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-black uppercase tracking-[0.4em] text-accent">
                  Creative Digital Agency
                </span>
              </div>
              
              <h1 className="heading-xl text-balance reveal-up leading-[0.9]">
                Realizing Your <br />
                <span className="text-accent italic font-black">
                  Biggest Ideas.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-textSoft leading-relaxed max-w-xl reveal-up stagger-1">
                We transform visionary concepts into digital masterworks. 
                Where high-end design meets cutting-edge execution.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <button className="btn-primary group reveal-up stagger-2">
                <span className="relative z-10">Start Project</span>
              </button>
              <button className="btn-secondary reveal-up stagger-3">
                View Showcase
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-5 border-t border-white/5 reveal-up stagger-4">
              <div className="flex items-center gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                 <div className="relative w-full max-w-sm h-10">
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

          {/* Hero Asset - Tanpa double animation agar sinkron */}
          <div className="relative">
             <div className="relative aspect-square lg:aspect-auto lg:h-[650px] w-full flex items-center justify-center group translate-x-10 lg:translate-x-20 reveal-up">
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                    <Image
                    src="/hero.gif"
                    alt="Hero illustration"
                    fill
                    className="object-contain scale-125 rounded-md"
                    priority
                    />
                </div>
             </div>

             {/* Floating badge - Muncul bareng tanpa delay */}
             <div className="absolute -bottom-10 -left-20 glass px-8 py-8 rounded-[2.5rem] shadow-2xl reveal-up border-white/10">
                <div className="flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                    <div className="text-4xl font-black text-accent tracking-tighter">100+</div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em] leading-tight">
                        ELITE <br/> PROJECTS
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
