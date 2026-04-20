export default function Loading() {
  return (
    <div className="container-custom py-12">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="text-center mb-12">
          <div className="h-12 bg-bgSoft rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-bgSoft rounded w-96 mx-auto"></div>
        </div>
        
        {/* Grid Placeholder */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              <div className="aspect-video bg-bgSoft rounded-lg mb-4"></div>
              <div className="h-4 bg-bgSoft rounded w-24 mb-2"></div>
              <div className="h-6 bg-bgSoft rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-bgSoft rounded w-full mb-2"></div>
              <div className="h-4 bg-bgSoft rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
