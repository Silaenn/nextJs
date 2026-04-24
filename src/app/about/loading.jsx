export default function Loading() {
  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(54,115,253,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="container-custom relative z-10 animate-pulse">

        {/* Header Section Placeholder */}
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 xl:gap-48 items-center mb-20 sm:mb-24 lg:mb-32">

          {/* Text side */}
          <div className="order-2 lg:order-1">
            <div className="h-3 sm:h-4 bg-accent/20 rounded-full w-24 sm:w-32 mb-4 sm:mb-6" />
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 lg:mb-12">
              <div className="h-3 sm:h-4 lg:h-5 bg-white/5 rounded-2xl sm:rounded-3xl w-2/5" />
              <div className="h-10 sm:h-12 lg:h-16 bg-white/5 rounded-2xl sm:rounded-3xl w-full" />
              <div className="h-10 sm:h-12 lg:h-16 bg-white/5 rounded-2xl sm:rounded-3xl w-3/4" />
            </div>
            <div className="space-y-2 mb-8 sm:mb-10 lg:mb-12">
              <div className="h-3 sm:h-4 bg-white/5 rounded-full w-full" />
              <div className="h-3 sm:h-4 bg-white/5 rounded-full w-full" />
              <div className="h-3 sm:h-4 bg-white/5 rounded-full w-2/3" />
            </div>

            {/* Stats Placeholder */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-8 sm:h-10 bg-accent/20 rounded-lg sm:rounded-xl w-12 sm:w-16 mb-1.5 sm:mb-2" />
                  <div className="h-2.5 sm:h-3 bg-white/5 rounded-full w-20 sm:w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative h-[280px] sm:h-[380px] lg:h-[600px] w-full order-1 lg:order-2 bg-white/5 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem]" />
        </div>

        {/* Feature Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-8 lg:p-10 border-white/5 h-48 sm:h-56 lg:h-64 flex flex-col justify-end"
            >
              <div className="w-8 sm:w-12 h-1 bg-accent/50 mb-6 sm:mb-8 lg:mb-10" />
              <div className="h-5 sm:h-6 bg-white/5 rounded-lg sm:rounded-xl w-1/2 mb-3 sm:mb-4" />
              <div className="h-3 sm:h-4 bg-white/5 rounded-full w-full" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}