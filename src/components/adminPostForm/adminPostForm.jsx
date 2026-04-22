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
    }
  }, [state]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
         <div className="h-8 w-[2px] bg-accent" />
         <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">Project Intel.</h2>
      </div>
      
      <form action={formAction} ref={formRef} className="space-y-6">
        <input type="hidden" name="userId" value={userId} />
        
        <div className="space-y-2">
          <label htmlFor="title" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Cinematic Platform"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">URL Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="e.g. cinematic-platform"
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Visual Asset</label>
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
              className="flex items-center justify-center gap-4 w-full p-8 border border-dashed border-white/10 rounded-3xl cursor-pointer hover:bg-white/5 transition-all group"
            >
              <span className="text-xs font-black uppercase tracking-widest text-muted group-hover:text-white">
                {preview ? "Swap Visual" : "Upload Asset"}
              </span>
            </label>
            {preview && (
              <div className="mt-4 relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="desc" className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">Brief Description</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Architecture breakdown..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all min-h-[120px] resize-none"
            required
          />
        </div>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
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
      <span className="relative z-10 font-black uppercase tracking-[0.2em]">
        {pending ? "ARCHITECTING..." : "DEPLOY CASE STUDY"}
      </span>
    </button>
  );
}

export default AdminPostForm;
