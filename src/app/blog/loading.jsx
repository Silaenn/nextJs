import { PostCardSkeleton } from "@/components/skeletons/skeletons";

export default function Loading() {
  return (
    <div className="container-custom py-12">
      {/* Header Placeholder */}
      <div className="mb-12 text-center animate-pulse">
        <div className="h-10 md:h-12 bg-bgSoft rounded-lg w-64 md:w-80 mx-auto mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-bgSoft rounded w-full max-w-2xl mx-auto"></div>
          <div className="h-4 bg-bgSoft rounded w-3/4 max-w-lg mx-auto"></div>
        </div>
      </div>

      {/* Posts Grid Placeholder */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
