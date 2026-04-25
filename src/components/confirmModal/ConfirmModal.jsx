"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const typeStyles = {
    danger: {
      accent: "bg-red-500",
      border: "border-red-500/20",
      text: "text-red-500",
      button: "bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white",
      glow: "bg-red-500/5",
    },
    warning: {
      accent: "bg-yellow-500",
      border: "border-yellow-500/20",
      text: "text-yellow-500",
      button: "bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-white",
      glow: "bg-yellow-500/5",
    },
  };

  const style = typeStyles[type] || typeStyles.danger;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-md glass border ${style.border} rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-300 shadow-2xl shadow-black/50`}>
        {/* Glow Effect */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 ${style.glow} blur-[60px] pointer-events-none`} />
        
        <div className="p-8 sm:p-10 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`h-8 w-[2px] ${style.accent}`} />
            <h3 className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase text-white">
              {title}
            </h3>
          </div>

          {/* Message */}
          <p className="text-sm sm:text-base text-textSoft font-medium leading-relaxed mb-10 italic">
            &quot;{message}&quot;
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-[1.5] py-4 sm:py-5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all ${style.button}`}
            >
              Confirm Action
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 sm:py-5 bg-white/5 hover:bg-white/10 text-white rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/5"
            >
              Abort
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConfirmModal;
