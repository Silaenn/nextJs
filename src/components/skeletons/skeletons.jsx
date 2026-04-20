// Skeleton for Posts List
export const PostsSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="h-8 bg-bgSoft rounded w-24"></div>
      <div className="h-6 bg-bgSoft rounded w-16"></div>
    </div>
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-bg/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-bgSoft rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-bgSoft rounded w-32"></div>
              <div className="h-3 bg-bgSoft rounded w-20"></div>
            </div>
          </div>
          <div className="h-8 bg-bgSoft rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Users List
export const UsersSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="h-8 bg-bgSoft rounded w-24"></div>
      <div className="h-6 bg-bgSoft rounded w-16"></div>
    </div>
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-bg/50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-bgSoft rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-bgSoft rounded w-32"></div>
              <div className="h-3 bg-bgSoft rounded w-24"></div>
            </div>
          </div>
          <div className="h-8 bg-bgSoft rounded w-20"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Forms
export const FormSkeleton = ({ title = "Loading" }) => (
  <div className="card animate-pulse">
    <div className="h-8 bg-bgSoft rounded w-40 mb-6"></div>
    <div className="space-y-5">
      <div className="h-10 bg-bgSoft rounded"></div>
      <div className="h-10 bg-bgSoft rounded"></div>
      <div className="h-10 bg-bgSoft rounded"></div>
      <div className="h-32 bg-bgSoft rounded"></div>
      <div className="h-10 bg-bgSoft rounded"></div>
    </div>
  </div>
);

// Skeleton for Blog Post Card
export const PostCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="aspect-video bg-bgSoft rounded-lg mb-4"></div>
    <div className="h-4 bg-bgSoft rounded w-24 mb-2"></div>
    <div className="h-6 bg-bgSoft rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-bgSoft rounded w-full mb-2"></div>
    <div className="h-4 bg-bgSoft rounded w-2/3"></div>
  </div>
);

// Skeleton for Single Post
export const PostSkeleton = () => (
  <div className="container-custom py-12 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="aspect-video bg-bgSoft rounded-xl mb-8"></div>
      <div className="h-10 bg-bgSoft rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-bgSoft rounded w-32 mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-bgSoft rounded w-full"></div>
        <div className="h-4 bg-bgSoft rounded w-full"></div>
        <div className="h-4 bg-bgSoft rounded w-3/4"></div>
      </div>
    </div>
  </div>
);
