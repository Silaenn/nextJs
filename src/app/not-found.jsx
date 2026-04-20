import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary opacity-50">404</div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-textSoft mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-8 0h6" />
            </svg>
            Go Home
          </Link>
          <Link href="/blog" className="btn-secondary inline-flex items-center justify-center gap-2">
            Browse Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
