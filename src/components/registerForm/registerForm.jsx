"use client";

import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const result = await register(null, formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("System failure. Deployment of new identity failed.");
      setIsLoading(false);
    }
  };

  const validatePassword = (e) => {
    const form = e.target.form;
    const password = form?.password?.value || "";
    const passwordRepeat = form?.passwordRepeat?.value || "";
    setPasswordsMatch(password === passwordRepeat);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Alias</label>
            <input
                type="text"
                name="username"
                required
                minLength={3}
                maxLength={20}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                placeholder="Username"
            />
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Channel</label>
            <input
                type="email"
                name="email"
                required
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                placeholder="Email Address"
            />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Secret Key</label>
            <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                placeholder="••••••••"
            />
        </div>

        <div className="space-y-2">
            <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Verify Key</label>
            <input
                type="password"
                name="passwordRepeat"
                required
                minLength={6}
                className={`w-full bg-white/[0.03] border ${!passwordsMatch ? "border-red-500" : "border-white/10"} rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all`}
                placeholder="••••••••"
                onChange={validatePassword}
                onBlur={validatePassword}
            />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Operational Role</label>
        <select name="isAdmin" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all">
          <option value="false" className="bg-bg">Client (Case Studies)</option>
          <option value="true" className="bg-bg">Admin (Agency Intel)</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
          Identity Secured. Initializing login...
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !passwordsMatch}
        className="btn-primary w-full group"
      >
        <span className="relative z-10 font-black uppercase tracking-[0.2em]">
            {isLoading ? "Synchronizing..." : "Initialize Identity"}
        </span>
      </button>
    </form>
  );
}
