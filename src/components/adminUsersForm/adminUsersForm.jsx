"use client";

import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { FormSkeleton } from "@/components/skeletons/skeletons";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <FormSkeleton />;

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all";

  const labelClass =
    "text-[9px] sm:text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1";

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">

      {/* Section Title */}
      <div className="flex items-center gap-3">
        <div className="h-6 sm:h-8 w-[2px] bg-accent-2 flex-shrink-0" />
        <h2 className="text-base sm:text-lg lg:text-xl font-black italic tracking-tighter uppercase text-white">
          Member Onboarding.
        </h2>
      </div>

      <form action={formAction} className="space-y-4 sm:space-y-5 lg:space-y-6">

        {/* Alias + Email — 2 col di md ke atas, stack di mobile */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="username" className={labelClass}>Alias</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="email" className={labelClass}>Electronic Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="password" className={labelClass}>Secret Key</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className={inputClass}
            required
          />
        </div>

        {/* Toggle */}
        <div className="py-3 sm:py-4">
          <label className="flex items-center gap-3 sm:gap-4 cursor-pointer group w-fit">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                name="isAdmin"
                value="true"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-all duration-500 border border-white/10 ${isAdmin ? "bg-accent border-accent" : "bg-white/5"}`}>
                <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-xl transform transition-transform duration-500 mt-[4px] sm:mt-[3px] ${isAdmin ? "translate-x-6 sm:translate-x-7" : "translate-x-1"}`} />
              </div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Grant Admin Authority
            </span>
          </label>
        </div>

        {/* Error */}
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center">
            {state.error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full group">
          <span className="relative z-10 font-black uppercase tracking-[0.2em] text-xs sm:text-sm">
            Authorize Member
          </span>
        </button>

      </form>
    </div>
  );
};

export default AdminUserForm;