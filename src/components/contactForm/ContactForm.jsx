"use client";

import { useFormState } from "react-dom";
import { sendInquiry } from "@/lib/action";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/toast/Toast";

const ContactForm = ({ userId, initialName, initialEmail }) => {
  const [state, formAction] = useFormState(sendInquiry, undefined);
  const formRef = useRef();
  const toast = useToast();
  const toastRef = useRef(toast);

  useEffect(() => {
    if (state?.success) {
      toastRef.current.success("Connection established. We will talk soon.");
      formRef.current?.reset();
      // Trigger event to refresh TransmissionArchive
      window.dispatchEvent(new CustomEvent("inquiry-sent"));
    }
    if (state?.error) {
      toastRef.current.error(state.error);
    }
  }, [state]);

  return (
    <div className="w-full">
      <form action={formAction} ref={formRef} className="space-y-6">
        <input type="hidden" name="userId" value={userId || ""} />
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-3">
            <label htmlFor="name" className="label-luxury">
                Identity
            </label>
            <input
                type="text"
                id="name"
                name="name"
                defaultValue={initialName || ""}
                readOnly={!!initialName}
                placeholder="Name Surname"
                className={`input-luxury ${initialName ? "opacity-60 cursor-not-allowed" : ""}`}
                required
            />
            </div>

            {/* Email */}
            <div className="space-y-3">
            <label htmlFor="email" className="label-luxury">
                Channel
            </label>
            <input
                type="email"
                id="email"
                name="email"
                defaultValue={initialEmail || ""}
                readOnly={!!initialEmail}
                placeholder="Email Address"
                className={`input-luxury ${initialEmail ? "opacity-60 cursor-not-allowed" : ""}`}
                required
            />
            </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <label htmlFor="message" className="label-luxury">
            Brief
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your project vision..."
            className="textarea-luxury"
            required
          />
        </div>

        {/* Guest Nudge */}
        {!userId && (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5">
            <p className="text-[9px] sm:text-[10px] text-textSoft font-medium leading-relaxed italic">
              <span className="text-accent font-black uppercase tracking-widest mr-2">Pro Tip:</span>
              Log in before sending to track this transmission status in your private workspace real-time.
            </p>
          </div>
        )}

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
