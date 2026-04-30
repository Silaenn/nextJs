"use client";

import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/toast/Toast";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (success) {
      toast.success("Identity Secured. Initializing login...");
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const result = await register(null, formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        setIsLoading(false);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("System failure. Deployment of new identity failed.");
      toast.error("System failure. Deployment of new identity failed.");
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
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="space-y-2">
        <label className="label-luxury">Alias</label>
        <input
          type="text"
          name="username"
          required
          minLength={3}
          maxLength={20}
          className="input-luxury"
          placeholder="Username"
        />
      </div>

      <div className="space-y-2">
        <label className="label-luxury">Channel</label>
        <input
          type="email"
          name="email"
          required
          className="input-luxury"
          placeholder="Email Address"
        />
      </div>

      <div className="space-y-2">
        <label className="label-luxury">Secret Key</label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="input-luxury"
          placeholder="••••••••"
        />
      </div>

      <div className="space-y-2">
        <label className="label-luxury">Verify Key</label>
        <input
          type="password"
          name="passwordRepeat"
          required
          minLength={6}
          className={`input-luxury ${
            !passwordsMatch ? "!border-red-500" : ""
          }`}
          placeholder="••••••••"
          onChange={validatePassword}
          onBlur={validatePassword}
        />
        {!passwordsMatch && (
          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest ml-1">
            Keys do not match.
          </p>
        )}
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
        className="btn-primary w-full group !mt-6"
      >
        <span className="relative z-10 font-black uppercase tracking-[0.2em]">
          {isLoading ? "Synchronizing..." : "Initialize Identity"}
        </span>
      </button>

    </form>
  );
}