"use client";

import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto text-red-500/50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-textSoft mb-8">
          We&apos;re sorry, but an unexpected error occurred. Please try refreshing the page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => reset()} 
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.058M5.058 7.5a11.966 11.966 0 01-1.622-2.466 12 12 0 1017.128 17.128 11.966 11.966 0 01-2.466-1.622M12 8v4m0 4h.01" />
            </svg>
            Try Again
          </button>
          <a href="/" className="btn-secondary inline-flex items-center justify-center gap-2">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
