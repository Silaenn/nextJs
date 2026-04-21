"use client";

import { addPost } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const [preview, setPreview] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setPreview(null);
      alert("Case Study created successfully!");
    }
  }, [state]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Add New Case Study</h2>
      
      <form action={formAction} ref={formRef} className="space-y-5">
        <input type="hidden" name="userId" value={userId} />
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-textSoft mb-2">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. E-commerce Platform Redesign"
            className="input-field"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-textSoft mb-2">
            Project URL Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="e.g. ecommerce-redesign"
            className="input-field"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            title="Lowercase letters, numbers, and hyphens only"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="img" className="block text-sm font-medium text-textSoft mb-2">
            Project Cover Image
          </label>
          <div className="relative">
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="img"
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-bgSoft rounded-lg cursor-pointer hover:border-primary transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-textSoft group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-textSoft group-hover:text-primary transition-colors">
                {preview ? "Change image" : "Choose project image"}
              </span>
            </label>
            {preview && (
              <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border border-bgSoft animate-scaleIn">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-textSoft mb-2">
            Project Description
          </label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Describe the project, challenges, and results..."
            className="input-field min-h-[150px] resize-y"
            rows={6}
            required
          />
        </div>

        {/* Error Message */}
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm animate-fadeIn">
            {state.error}
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton />
      </form>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
    >
      {pending ? (
        <>
          <div className="spinner w-5 h-5 border-2"></div>
          Saving Project...
        </>
      ) : (
        "Create Case Study"
      )}
    </button>
  );
}

export default AdminPostForm;
