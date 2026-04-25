"use client";

import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { AdminUserFormSkeleton } from "@/components/skeletons/skeletons";
import { useToast } from "@/components/toast/Toast";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const formRef = useRef();

  useEffect(() => {
    setLoading(false);
    if (state?.success) {
      toast.success("Member authorized successfully.");
      formRef.current?.reset();
      // Trigger event to refresh AdminUsers list
      window.dispatchEvent(new CustomEvent("user-created"));
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, toast]);

  if (loading) return <AdminUserFormSkeleton />;

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

      <form action={formAction} ref={formRef} className="space-y-4 sm:space-y-5 lg:space-y-6">

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

        {/* Hidden Admin Status (Forced to true) */}
        <input type="hidden" name="isAdmin" value="true" />

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