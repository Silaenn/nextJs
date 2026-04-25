"use client";

import { addPost } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AdminPostFormSkeleton } from "@/components/skeletons/skeletons";
import { useToast } from "@/components/toast/Toast";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef();
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
    if (state?.success) {
      toast.success("Post deployed successfully.");
      formRef.current?.reset();
      setPreview(null);
      // Trigger event to refresh AdminPosts list
      window.dispatchEvent(new CustomEvent("post-created"));
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, toast]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <AdminPostFormSkeleton />;

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all";

  const labelClass =
    "text-[9px] sm:text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1";

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">

      {/* Section Title */}
      <div className="flex items-center gap-3">
        <div className="h-6 sm:h-8 w-[2px] bg-accent flex-shrink-0" />
        <h2 className="text-base sm:text-lg lg:text-xl font-black italic tracking-tighter uppercase text-white">
          Project Intel.
        </h2>
      </div>

      <form action={formAction} ref={formRef} className="space-y-4 sm:space-y-5 lg:space-y-6">
        <input type="hidden" name="userId" value={userId} />

        {/* Title */}
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Cinematic Platform"
            className={inputClass}
            required
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="slug" className={labelClass}>URL Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="e.g. cinematic-platform"
            className={inputClass}
            required
          />
          <p className="text-[8px] text-muted uppercase tracking-widest ml-1">
            * Lowercase, numbers, and hyphens only (no spaces)
          </p>
        </div>

        {/* Image Upload */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className={labelClass}>Visual Asset</label>
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
              className="flex items-center justify-center gap-3 sm:gap-4 w-full p-5 sm:p-6 lg:p-8 border border-dashed border-white/10 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-white/5 transition-all group"
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted group-hover:text-white">
                {preview ? "Swap Visual" : "Upload Asset"}
              </span>
            </label>
            {preview && (
              <div className="mt-3 sm:mt-4 relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="desc" className={labelClass}>Brief Description</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Architecture breakdown..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all min-h-[100px] sm:min-h-[120px] resize-none"
            required
          />
        </div>

        {/* Error */}
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center">
            {state.error}
          </div>
        )}

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
      className="btn-primary w-full group"
    >
      <span className="relative z-10 font-black uppercase tracking-[0.2em] text-xs sm:text-sm">
        {pending ? "ARCHITECTING..." : "DEPLOY CASE STUDY"}
      </span>
    </button>
  );
}

export default AdminPostForm;