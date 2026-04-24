import React from "react";
import Link from "next/link";

const Footer = ({ session }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto py-8 sm:py-12 border-t border-white/5 bg-bg/50 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-1 sm:gap-2 items-center sm:items-start">
            <div className="text-lg sm:text-xl font-black tracking-tighter text-white">
              IDEA<span className="text-accent italic">REALITY.</span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
              Crafting Digital Masterworks
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 sm:gap-10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-accent transition-colors">Case Studies</Link>
          </div>

          {/* Copyright */}
          <div className="text-[9px] sm:text-[10px] font-black text-muted uppercase tracking-[0.2em]">
            © {currentYear} ALL RIGHTS RESERVED
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
