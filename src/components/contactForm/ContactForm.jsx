"use client";

import { useFormState } from "react-dom";
import { sendInquiry } from "@/lib/action";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/toast/Toast";

const ContactForm = ({ userId }) => {
  const [state, formAction] = useFormState(sendInquiry, undefined);
  const formRef = useRef();
  const toast = useToast();

  useEffect(() => {
    if (state?.success) {
      toast.success("Connection established. We will talk soon.");
      formRef.current?.reset();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, toast]);

  return (
    <div className="w-full">
      <form action={formAction} ref={formRef} className="space-y-6">
        <input type="hidden" name="userId" value={userId || ""} />
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-3">
            <label htmlFor="name" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                Identity
            </label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name Surname"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                required
            />
            </div>

            {/* Email */}
            <div className="space-y-3">
            <label htmlFor="email" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                Channel
            </label>
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

        {/* Message */}
        <div className="space-y-3">
          <label htmlFor="message" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
            Brief
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your project vision..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all min-h-[160px] resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full group"
        >
          <span className="relative z-10 font-black uppercase tracking-[0.2em]">Initiate Contact</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
