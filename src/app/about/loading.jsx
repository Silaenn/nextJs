export default function Loading() {
  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(54,115,253,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-custom relative z-10 animate-pulse">
        {/* Header Section Placeholder */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-48 items-center mb-32">
            <div>
                <div className="h-4 bg-accent/20 rounded-full w-32 mb-6"></div>
                <div className="space-y-4 mb-12">
                    <div className="h-16 bg-white/5 rounded-3xl w-full"></div>
                    <div className="h-16 bg-white/5 rounded-3xl w-3/4"></div>
                </div>
                <div className="space-y-2 mb-12">
                    <div className="h-4 bg-white/5 rounded-full w-full"></div>
                    <div className="h-4 bg-white/5 rounded-full w-full"></div>
                    <div className="h-4 bg-white/5 rounded-full w-2/3"></div>
                </div>

                {/* Stats Cards Placeholder */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i}>
                            <div className="h-10 bg-accent/20 rounded-xl w-16 mb-2"></div>
                            <div className="h-3 bg-white/5 rounded-full w-24"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative h-[400px] lg:h-[600px] w-full bg-white/5 rounded-[3rem]">
            </div>
        </div>

        {/* Feature Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="glass rounded-[3rem] p-10 border-white/5 h-64 flex flex-col justify-end">
                    <div className="w-12 h-1 bg-accent/50 mb-10" />
                    <div className="h-6 bg-white/5 rounded-xl w-1/2 mb-4"></div>
                    <div className="h-4 bg-white/5 rounded-full w-full"></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
