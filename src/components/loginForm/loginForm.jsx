"use client";

import { login } from "@/lib/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const result = await login(null, formData);
      
      // If we reach here, it means no redirect happened (which means an error occurred)
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } catch (err) {
      // If it's a redirect error, let it happen
      if (err.message?.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
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
          className="input-field"
          placeholder="Enter your username"
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
          className="input-field"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
