export default function Loading() {
  return (
    <div className="container-custom py-12">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="text-center mb-12">
          <div className="h-8 bg-bgSoft rounded w-40 mx-auto mb-4"></div>
          <div className="h-12 bg-bgSoft rounded w-96 mx-auto"></div>
        </div>
        
        {/* Form Placeholder */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-10 bg-bgSoft rounded"></div>
          <div className="h-10 bg-bgSoft rounded"></div>
          <div className="h-10 bg-bgSoft rounded"></div>
          <div className="h-32 bg-bgSoft rounded"></div>
          <div className="h-12 bg-bgSoft rounded"></div>
        </div>
      </div>
    </div>
  );
}
