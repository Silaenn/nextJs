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

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
         <div className="h-8 w-[2px] bg-accent-2" />
         <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">Member Onboarding.</h2>
      </div>
      
      <form action={formAction} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
            <label htmlFor="username" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Alias</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                required
            />
            </div>

            <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Electronic Mail</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                required
            />
            </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Secret Key</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
            required
          />
        </div>

        <div className="py-4">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="isAdmin"
                value="true"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-14 h-7 rounded-full transition-all duration-500 border border-white/10 ${isAdmin ? 'bg-accent border-accent' : 'bg-white/5'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-xl transform transition-transform duration-500 mt-[3px] ${isAdmin ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </div>
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Grant Admin Authority</span>
          </label>
        </div>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full group"
        >
          <span className="relative z-10 font-black uppercase tracking-[0.2em]">Authorize Member</span>
        </button>
      </form>
    </div>
  );
};

export default AdminUserForm;
