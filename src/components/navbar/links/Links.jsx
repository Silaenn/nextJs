"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import NavLink from "./navLink/navLink";
import { handleLogout } from "@/lib/action";

const links = [
  { title: "Homepage", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Case Studies", path: "/blog" },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLinks = session?.user 
    ? links.filter(link => link.path !== "/" && link.path !== "/about" && link.path !== "/contact")
    : links;

  const mobileMenu = mounted && (
    <div 
      className={`md:hidden fixed inset-0 z-[9999] transition-all duration-400 ease-out ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background overlay with blur - Simplified to one transition layer */}
      <div 
        className="absolute inset-0 bg-bg/60 backdrop-blur-xl" 
        onClick={() => setOpen(false)} 
      />

      {/* Drawer content with slide animation */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-surface border-l border-white/5 p-8 flex flex-col gap-8 shadow-2xl transition-transform duration-400 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
           <span className="text-xl font-black italic tracking-tighter text-white">NAVIGATE.</span>
           <button 
             onClick={() => setOpen(false)} 
             className="text-muted hover:text-white p-2 transition-transform hover:rotate-90 duration-300"
             aria-label="Close menu"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>
        
        <div className="flex flex-col gap-2">
          {filteredLinks.map((link, index) => (
            <div 
              key={link.title} 
              style={{ transitionDelay: open ? `${index * 60}ms` : "0ms" }}
              className={`transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <NavLink 
                item={link} 
                mobile
                onClick={() => setOpen(false)}
              />
            </div>
          ))}
          {session?.user ? (
            <div 
            style={{ transitionDelay: open ? `${filteredLinks.length * 60}ms` : "0ms" }}
            className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
              {session.user?.isAdmin ? (
                <NavLink 
                  item={{ title: "Admin", path: "/admin" }} 
                  mobile
                  onClick={() => setOpen(false)}
                />
              ) : (
                <NavLink 
                  item={{ title: "Workspace", path: "/workspace" }} 
                  mobile
                  onClick={() => setOpen(false)}
                />
              )}
              <form action={handleLogout} className="mt-4">
                <button 
                  type="submit"
                  className="w-full text-left px-6 py-4 rounded-2xl text-red-400 font-bold uppercase tracking-widest text-sm hover:bg-red-400/10 transition-all"
                >
                  Logout Session
                </button>
              </form>
            </div>
          ) : (
            <div className={`transition-all duration-500 delay-[200ms] ${open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
              <NavLink 
                item={{ title: "Login", path: "/login" }} 
                mobile
                onClick={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {filteredLinks.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin ? (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            ) : (
              <NavLink item={{ title: "Workspace", path: "/workspace" }} />
            )}
            <form action={handleLogout} className="ml-2">
              <button 
                type="submit"
                className="px-5 py-2 text-xs font-black uppercase tracking-widest text-muted hover:text-accent transition-colors"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Entry", path: "/login" }} />
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white pointer-events-auto"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div className="w-5 flex flex-col gap-1.5">
          <span className={`h-0.5 w-full bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-full bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Drawer (Portal) */}
      {mounted && createPortal(mobileMenu, document.body)}
    </div>
  );
};

export default Links;

