// Skeleton for Posts List
export const PostsSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-10">
      <div className="h-8 bg-white/5 rounded-full w-48"></div>
      <div className="h-4 bg-white/5 rounded-full w-24"></div>
    </div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-6 glass rounded-3xl border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl"></div>
            <div className="space-y-3">
              <div className="h-5 bg-white/5 rounded-full w-48"></div>
              <div className="h-3 bg-white/5 rounded-full w-32"></div>
            </div>
          </div>
          <div className="h-10 bg-white/5 rounded-full w-24"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Users List
export const UsersSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-10">
      <div className="h-8 bg-white/5 rounded-full w-48"></div>
      <div className="h-4 bg-white/5 rounded-full w-24"></div>
    </div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-6 glass rounded-3xl border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-5 bg-white/5 rounded-full w-48"></div>
              <div className="h-3 bg-white/5 rounded-full w-32"></div>
            </div>
          </div>
          <div className="h-10 bg-white/5 rounded-full w-24"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Forms
export const FormSkeleton = () => (
  <div className="glass rounded-[3rem] p-10 md:p-20 border-white/5 animate-pulse">
    <div className="h-4 bg-accent/20 rounded-full w-32 mb-6"></div>
    <div className="h-10 bg-white/5 rounded-2xl w-64 mb-12"></div>
    <div className="space-y-6">
      <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
      <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
      <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
      <div className="h-48 bg-white/5 rounded-[2rem] w-full"></div>
      <div className="h-16 bg-accent/20 rounded-full w-full"></div>
    </div>
  </div>
);

// Skeleton for Blog Post Card
export const PostCardSkeleton = () => (
  <div className="glass rounded-[2rem] border-white/5 animate-pulse h-full overflow-hidden">
    <div className="relative aspect-[4/5] bg-white/5">
        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="h-8 bg-white/5 rounded-xl w-3/4 mb-4"></div>
            <div className="h-4 bg-white/5 rounded-full w-full mb-2"></div>
            <div className="h-4 bg-white/5 rounded-full w-2/3 mb-6"></div>
            <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-accent/30" />
                <div className="h-2 bg-white/5 rounded-full w-20"></div>
            </div>
        </div>
    </div>
  </div>
);

// Skeleton for Single Post
export const PostSkeleton = () => (
  <div className="container-custom py-32 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="aspect-video bg-white/5 rounded-[3rem] mb-12"></div>
      <div className="h-16 bg-white/5 rounded-3xl w-3/4 mb-8"></div>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-12 h-12 bg-white/5 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded-full w-32"></div>
          <div className="h-3 bg-white/5 rounded-full w-20"></div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-4 bg-white/5 rounded-full w-full"></div>
        <div className="h-4 bg-white/5 rounded-full w-full"></div>
        <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
        <div className="h-4 bg-white/5 rounded-full w-5/6 mt-12"></div>
        <div className="h-4 bg-white/5 rounded-full w-full"></div>
      </div>
    </div>
  </div>
);
