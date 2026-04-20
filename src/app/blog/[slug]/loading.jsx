export default function Loading() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          {/* Image Placeholder */}
          <div className="aspect-video bg-bgSoft rounded-xl mb-8"></div>
          
          {/* Title Placeholder */}
          <div className="h-12 bg-bgSoft rounded w-3/4 mb-6"></div>
          
          {/* Meta Placeholder */}
          <div className="flex gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bgSoft rounded-full"></div>
              <div>
                <div className="h-4 bg-bgSoft rounded w-24 mb-1"></div>
                <div className="h-3 bg-bgSoft rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-bgSoft rounded w-32"></div>
          </div>
          
          {/* Content Placeholder */}
          <div className="space-y-4">
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-3/4"></div>
            <div className="h-4 bg-bgSoft rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
