// Skeleton for Inquiry Archive (Matches AdminInquiries)
export const InquirySkeleton = () => (
  <div className="h-full animate-pulse">
    {/* Header Match: Client Intel. */}
    <div className="flex items-center justify-between mb-10">
      <div className="h-8 bg-white/10 rounded-xl w-48"></div>
      <div className="h-8 bg-white/5 rounded-full w-24"></div>
    </div>

    {/* Cards Scroll Area Match: max-h-[600px] */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-hidden pr-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="h-4 bg-white/10 rounded-full w-32"></div>
            <div className="h-3 bg-white/5 rounded-full w-16"></div>
          </div>
          <div className="h-3 bg-accent/20 rounded-full w-40 mb-4"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-white/5 rounded-lg w-full"></div>
            <div className="h-4 bg-white/5 rounded-lg w-full"></div>
            <div className="h-4 bg-white/5 rounded-lg w-2/3"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <div className="h-3 bg-accent/20 rounded-full w-12"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Posts List (Matches AdminPosts)
export const PostsSkeleton = () => (
  <div className="h-full animate-pulse">
    {/* Header Match: Case Inventory. */}
    <div className="flex items-center justify-between mb-10">
      <div className="h-8 bg-white/10 rounded-xl w-48"></div>
      <div className="h-8 bg-white/5 rounded-full w-24"></div>
    </div>
    
    {/* List Scroll Area Match: max-h-[500px] */}
    <div className="space-y-4 max-h-[600px] overflow-hidden pr-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl glass border border-white/10"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded-full w-48"></div>
              <div className="h-2 bg-white/5 rounded-full w-32"></div>
            </div>
          </div>
          <div className="h-8 bg-white/5 rounded-full w-24"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Users List (Matches AdminUsers)
export const UsersSkeleton = () => (
  <div className="h-full animate-pulse">
    {/* Header Match: Member Registry. */}
    <div className="flex items-center justify-between mb-10">
      <div className="h-8 bg-white/10 rounded-xl w-48"></div>
      <div className="h-8 bg-white/5 rounded-full w-24"></div>
    </div>

    {/* List Scroll Area Match: max-h-[500px] */}
    <div className="space-y-4 max-h-[500px] overflow-hidden pr-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-full glass border border-white/10"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-4 bg-white/10 rounded-full w-32"></div>
                <div className="h-3 bg-accent/20 rounded-full w-10"></div>
              </div>
              <div className="h-2 bg-white/5 rounded-full w-40"></div>
            </div>
          </div>
          <div className="h-8 bg-white/5 rounded-full w-24"></div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for Forms (Matches AdminPostForm & AdminUserForm)
export const FormSkeleton = () => (
  <div className="space-y-10 animate-pulse">
    {/* Header Match: Project Intel. / Member Onboarding. */}
    <div className="flex items-center gap-3">
       <div className="h-8 w-[2px] bg-white/20" />
       <div className="h-8 bg-white/10 rounded-xl w-48"></div>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="h-3 bg-white/5 rounded-full w-12 ml-1"></div>
        <div className="h-14 bg-white/[0.03] border border-white/10 rounded-2xl w-full"></div>
      </div>
      <div className="space-y-6">
        <div className="h-3 bg-white/5 rounded-full w-16 ml-1"></div>
        <div className="h-14 bg-white/[0.03] border border-white/10 rounded-2xl w-full"></div>
      </div>
      <div className="space-y-6">
        <div className="h-3 bg-white/5 rounded-full w-16 ml-1"></div>
        <div className="h-20 bg-white/[0.03] border border-white/10 rounded-2xl w-full"></div>
      </div>
      <div className="space-y-6">
        <div className="h-3 bg-white/5 rounded-full w-20 ml-1"></div>
        <div className="h-32 bg-white/[0.03] border border-dashed border-white/10 rounded-3xl w-full"></div>
      </div>
      <div className="h-16 bg-white/[0.03] rounded-full w-full mt-10"></div>
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
