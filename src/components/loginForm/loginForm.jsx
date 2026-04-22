"use client";

import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const result = await login(null, formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (err) {
      if (err.message?.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setError("Authorization failed. Please verify credentials.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                Access Identity
            </label>
            <input
                type="text"
                name="username"
                required
                minLength={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                placeholder="Username"
            />
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                Security Key
            </label>
            <input
                type="password"
                name="password"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                placeholder="••••••••"
            />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full group"
      >
        <span className="relative z-10 font-black uppercase tracking-[0.2em]">
            {isLoading ? "Verifying..." : "Authorize Access"}
        </span>
      </button>
    </form>
  );
}
