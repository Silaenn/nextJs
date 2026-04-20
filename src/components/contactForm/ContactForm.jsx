"use client";

import { useFormState } from "react-dom";
import { sendInquiry } from "@/lib/action";
import { useEffect, useRef } from "react";

const ContactForm = ({ userId }) => {
  const [state, formAction] = useFormState(sendInquiry, undefined);
  const formRef = useRef();

  useEffect(() => {
    if (state?.success) {
      alert("Message sent successfully!");
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="max-w-lg">
      <h2 className="text-primary font-semibold mb-4">CONTACT US</h2>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Let&apos;s talk about your project
      </h1>
      <p className="text-textSoft mb-8">
        Have a question or want to work together? We&apos;d love to hear from you.
        Fill out the form and we&apos;ll get back to you as soon as possible.
      </p>

      <form action={formAction} ref={formRef} className="space-y-5">
        <input type="hidden" name="userId" value={userId || ""} />
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-textSoft mb-2">
            Name and Surname
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-textSoft mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            className="input-field"
            required
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-textSoft mb-2">
            Phone Number <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 (555) 000-0000"
            className="input-field"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-textSoft mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
            className="input-field min-h-[150px] resize-y"
            rows={5}
            required
          />
        </div>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
