export default function Loading() {
  return (
    <div className="container-custom py-12 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Placeholder */}
        <div className="relative h-[400px] lg:h-[600px] order-2 lg:order-1">
          <div className="w-full h-full bg-bgSoft rounded-xl animate-pulse"></div>
        </div>

        {/* Form Placeholder */}
        <div className="order-1 lg:order-2">
          <div className="max-w-lg animate-pulse">
            {/* Header Placeholders */}
            <div className="h-4 bg-bgSoft rounded w-24 mb-4"></div>
            <div className="h-10 bg-bgSoft rounded w-3/4 mb-6"></div>
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-bgSoft rounded w-full"></div>
              <div className="h-4 bg-bgSoft rounded w-5/6"></div>
            </div>

            {/* Form Fields Placeholders */}
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-bgSoft rounded w-32 mb-2"></div>
                  <div className="h-12 bg-bgSoft rounded w-full"></div>
                </div>
              ))}
              <div>
                <div className="h-4 bg-bgSoft rounded w-20 mb-2"></div>
                <div className="h-[150px] bg-bgSoft rounded w-full"></div>
              </div>
              <div className="h-12 bg-bgSoft rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
