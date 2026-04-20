"use client";

import { addUser } from "@/lib/action";
import { useFormState } from "react-dom";
import { useState } from "react";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Add New User</h2>
      
      <form action={formAction} className="space-y-5">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-textSoft mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            className="input-field"
            required
            minLength={3}
            maxLength={20}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-textSoft mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            className="input-field"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-textSoft mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            className="input-field"
            required
            minLength={6}
          />
          <p className="mt-1 text-xs text-textSoft">Minimum 6 characters</p>
        </div>

        {/* Profile Image URL */}
        <div>
          <label htmlFor="img" className="block text-sm font-medium text-textSoft mb-2">
            Profile Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            placeholder="https://example.com/avatar.jpg"
            className="input-field"
          />
          <p className="mt-1 text-xs text-textSoft">Optional - Leave empty for default avatar</p>
        </div>

        {/* Admin Toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                name="isAdmin"
                value="true"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${isAdmin ? 'bg-primary' : 'bg-bgSoft'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${isAdmin ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'}`}></div>
              </div>
            </div>
            <span className="text-sm font-medium text-textSoft">Grant admin privileges</span>
          </label>
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {state.error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full btn-primary"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminUserForm;
