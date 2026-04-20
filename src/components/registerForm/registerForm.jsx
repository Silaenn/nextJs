"use client";

import { register } from "@/lib/action";
import Link from "next/link";
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
      setError("Something went wrong. Please try again.");
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-textSoft mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          required
          minLength={3}
          maxLength={20}
          className="input-field"
          placeholder="Choose a username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textSoft mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="input-field"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textSoft mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="input-field"
          placeholder="Create a password"
        />
        <p className="mt-1 text-xs text-textSoft">Minimum 6 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-textSoft mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="passwordRepeat"
          required
          minLength={6}
          className={`input-field ${!passwordsMatch ? "border-red-500" : ""}`}
          placeholder="Confirm your password"
          onChange={validatePassword}
          onBlur={validatePassword}
        />
        {!passwordsMatch && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-textSoft mb-2">
          Register as
        </label>
        <select name="isAdmin" className="input-field bg-bgSoft">
          <option value="false">Client (View Case Studies)</option>
          <option value="true">Admin (Manage Agency)</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
          Account created successfully! Redirecting...
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !passwordsMatch}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>

      <div className="text-center text-sm text-textSoft">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}
