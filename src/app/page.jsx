import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import WorkspacePage from "./workspace/page";

const Home = async () => {
  const session = await auth();

  // 1. ADMIN FLOW: If Admin is logged in, redirect directly to Dashboard
  if (session?.user?.isAdmin) {
    redirect("/admin");
  }

  // 2. CLIENT FLOW: If Client is logged in, show Workspace instead of Landing Page
  if (session?.user) {
    return <WorkspacePage />;
  }

  // 3. PUBLIC FLOW: Show Landing Page for potential clients
  return (
    <main className="container-custom min-h-[calc(100vh-180px)] flex items-center py-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-8 animate-fadeIn">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Realizing Your{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Biggest Ideas.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-textSoft leading-relaxed max-w-xl">
              We are a creative agency that transforms your vision into digital reality. 
              From conceptualization to execution, we build the future you imagine.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="btn-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="btn-secondary hover:scale-105 transition-all duration-300">
              Our Works
            </button>
          </div>

          {/* Brands Section */}
          <div className="pt-8">
            <p className="text-sm text-textSoft mb-4">Trusted by leading companies</p>
            <div className="relative w-full max-w-md h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <Image 
                src="/brands.png" 
                alt="Trusted brands" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full animate-imageReveal">
          <Image
            src="/hero.gif"
            alt="Hero illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
