import { FormSkeleton } from "@/components/skeletons/skeletons";

export default function Loading() {
  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[50%] sm:w-[30%] h-[30%] bg-accent-2/5 blur-[70px] sm:blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center animate-pulse">

          {/* Form Placeholder — order 1 di mobile */}
          <div className="order-1 lg:order-2">
            <FormSkeleton />
          </div>

          {/* Image Placeholder — order 2 di mobile */}
          <div className="relative h-[240px] sm:h-[340px] lg:h-[600px] w-full order-2 lg:order-1 bg-white/5 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem]" />

        </div>
      </div>
    </div>
  );
}