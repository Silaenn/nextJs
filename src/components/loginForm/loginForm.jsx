"use client";

import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/toast/Toast";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const result = await login(null, formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        setIsLoading(false);
      } else {
        toast.success("Identity verified. Access granted.");
      }
    } catch (err) {
      if (err.message?.includes("NEXT_REDIRECT")) {
        toast.success("Identity verified. Access granted.");
        throw err;
      }
      setError("Authorization failed. Please verify credentials.");
      toast.error("Authorization failed. Please verify credentials.");
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", "admin_demo");
    formData.append("password", "admin123");
    
    try {
      const result = await login(null, formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        setIsLoading(false);
      } else {
        toast.success("Demo access granted. Welcome.");
      }
    } catch (err) {
      if (err.message?.includes("NEXT_REDIRECT")) {
        toast.success("Demo access granted. Welcome.");
        throw err;
      }
      setError("Demo access is temporarily unavailable.");
      toast.error("Demo access is temporarily unavailable.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ... existing form fields ... */}
        <div className="space-y-6">
          <div className="space-y-2">
              <label className="label-luxury">
                  Access Identity
              </label>
              <input
                  type="text"
                  name="username"
                  required
                  minLength={3}
                  className="input-luxury"
                  placeholder="Username"
              />
          </div>

          <div className="space-y-2">
              <label className="label-luxury">
                  Security Key
              </label>
              <input
                  type="password"
                  name="password"
                  required
                  className="input-luxury"
                  placeholder="••••••••"
              />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full group"
        >
          <span className="relative z-10 font-black uppercase tracking-[0.2em] text-xs sm:text-sm">
              {isLoading ? "Verifying..." : "Authorize Access"}
          </span>
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="bg-[#050505] px-4 text-muted">Or Explore</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGuestLogin}
        disabled={isLoading}
        className="w-full px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-accent/20 text-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-2 sm:gap-3 group"
      >
        <div className="hidden sm:block w-2 h-2 rounded-full bg-accent animate-pulse group-hover:scale-125 transition-transform flex-shrink-0" />
        <span className="text-[9px] min-[360px]:text-[10px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center leading-tight">
          Explore Admin Dashboard (Guest)
        </span>
      </button>
    </div>
  );
}
