export default function Loading() {
  return (
    <div className="container-custom py-12 overflow-hidden">
      {/* Hero Section Placeholder */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Text Section Placeholder */}
        <div className="order-2 lg:order-1 animate-pulse">
          <div className="h-4 bg-bgSoft rounded w-32 mb-4"></div>
          <div className="h-12 bg-bgSoft rounded w-full mb-6"></div>
          <div className="h-12 bg-bgSoft rounded w-4/5 mb-6"></div>
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-full"></div>
            <div className="h-4 bg-bgSoft rounded w-2/3"></div>
          </div>
          
          {/* Stats Placeholder */}
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="h-10 bg-bgSoft rounded w-16 mb-2 mx-auto lg:mx-0"></div>
                <div className="h-4 bg-bgSoft rounded w-20 mx-auto lg:mx-0"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Image Placeholder */}
        <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px]">
          <div className="w-full h-full bg-bgSoft rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Features Section Placeholder */}
      <div className="py-20 border-t border-bgSoft">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-bgSoft rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-bgSoft rounded w-full max-w-2xl mx-auto mb-2"></div>
          <div className="h-4 bg-bgSoft rounded w-3/4 max-w-xl mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-8 bg-bgSoft/50 rounded-3xl border border-bgSoft animate-pulse">
              <div className="w-12 h-12 bg-bgSoft rounded-lg mb-4"></div>
              <div className="h-6 bg-bgSoft rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-bgSoft rounded w-full mb-1"></div>
              <div className="h-4 bg-bgSoft rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
