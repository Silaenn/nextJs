import { PostCardSkeleton } from "@/components/skeletons/skeletons";

export default function Loading() {
  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Section Placeholder */}
        <div className="max-w-4xl mb-24 animate-pulse">
            <div className="h-4 bg-white/5 rounded-full w-32 mb-6"></div>
            <div className="space-y-4 mb-8">
                <div className="h-16 bg-white/5 rounded-3xl w-3/4"></div>
                <div className="h-16 bg-white/5 rounded-3xl w-1/2"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded-full w-full"></div>
                <div className="h-4 bg-white/5 rounded-full w-2/3"></div>
            </div>
        </div>

        {/* Posts Grid Placeholder */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
