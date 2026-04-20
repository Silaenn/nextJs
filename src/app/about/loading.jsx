export default function Loading() {
  return (
    <div className="container-custom py-12">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="mb-12">
          <div className="h-10 bg-bgSoft rounded w-32 mb-4"></div>
          <div className="h-16 bg-bgSoft rounded w-full max-w-2xl mb-4"></div>
          <div className="h-4 bg-bgSoft rounded w-full max-w-xl"></div>
        </div>
        
        {/* Content Placeholder */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] bg-bgSoft rounded-lg"></div>
          <div className="space-y-6">
            <div className="h-12 bg-bgSoft rounded w-3/4"></div>
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
