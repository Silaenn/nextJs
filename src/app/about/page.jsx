import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn more about our creative agency",
};

const stats = [
  { value: "12+", label: "YEARS OF INNOVATION", desc: "A legacy of digital excellence" },
  { value: "850+", label: "GLOBAL PARTNERS", desc: "Trusted by visionaries worldwide" },
  { value: "1.2k", label: "MILESTONES REACHED", desc: "Transforming ideas into reality" },
];

const features = [
  {
    title: "Web Strategy",
    desc: "Architecting complex digital ecosystems with surgical precision.",
  },
  {
    title: "Mobile Force",
    desc: "Developing seamless, immersive experiences for every touchpoint.",
  },
  {
    title: "Cinematic UI",
    desc: "Where high-art aesthetics meet human-centric interaction design.",
  },
  {
    title: "High Performance",
    desc: "Engineered for speed, built for reliability, optimized for growth.",
  },
];

const AboutPage = () => {
  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(54,115,253,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 xl:gap-48 items-center mb-20 sm:mb-24 lg:mb-32">
          
          {/* Text + Stats */}
          <div className="reveal-up order-2 lg:order-1">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent mb-4 sm:mb-6 block">
              Our Manifesto
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black leading-[0.95] mb-8 sm:mb-10 lg:mb-12 tracking-tighter">
              We design{" "}
              <span className="text-white italic">Futures.</span>{" "}
              <br className="hidden sm:block" />
              Not just interfaces.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-textSoft/80 leading-relaxed font-medium mb-8 sm:mb-10 lg:mb-12">
              We are a collective of designers, engineers, and strategists dedicated to
              the pursuit of digital perfection. We don&apos;t just build products; we create
              unforgettable experiences that define industries.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="reveal-up" style={{ animationDelay: `${0.1 * i}s` }}>
                  <div className="text-2xl sm:text-3xl font-black text-accent mb-1 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative h-[280px] sm:h-[380px] lg:h-[600px] w-full order-1 lg:order-2 lg:justify-self-end reveal-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Image
              src="/about.png"
              alt="Creative process"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(54,115,253,0.1)]"
              // Hapus offset !left-20 di mobile, tetap di lg ke atas
              style={{ left: undefined }}
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 reveal-up">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-10 border-white/5 hover:border-accent/20 transition-all duration-500 group flex flex-col h-full overflow-hidden"
            >
              <div className="w-8 sm:w-12 h-1 bg-accent mb-6 sm:mb-8 lg:mb-10 group-hover:w-full transition-all duration-500" />
              <h4 className="text-base sm:text-lg font-black tracking-tighter text-white mb-3 sm:mb-4 lg:mb-6 uppercase leading-tight">
                {feature.title}
              </h4>
              <p className="text-sm text-textSoft leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-24 sm:mt-32 lg:mt-40 text-center reveal-up px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tighter text-white mb-6 sm:mb-8 lg:mb-10">
            Ready to start your legacy?
          </h2>
          <button className="btn-primary w-full sm:w-auto">
            Join The Force
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;