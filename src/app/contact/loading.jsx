import { FormSkeleton } from "@/components/skeletons/skeletons";

export default function Loading() {
  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-accent-2/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center animate-pulse">
          {/* Image Placeholder */}
          <div className="relative h-[400px] lg:h-[600px] bg-white/5 rounded-[3rem]">
          </div>

          {/* Form Placeholder */}
          <FormSkeleton />
        </div>
      </div>
    </div>
  );
}
