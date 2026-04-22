"use client";

import { useState } from "react";
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

  const filteredLinks = session?.user 
    ? links.filter(link => link.path !== "/" && link.path !== "/about" && link.path !== "/contact")
    : links;

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
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div className="w-5 flex flex-col gap-1">
          <span className={`h-0.5 w-full bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`h-0.5 w-full bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Mobile Drawer (Glassmorphism) */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[150] bg-bg/60 backdrop-blur-xl animate-fadeIn">
          <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-surface border-l border-white/5 p-8 flex flex-col gap-8 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <span className="text-xl font-black italic tracking-tighter">NAVIGATE.</span>
               <button onClick={() => setOpen(false)} className="text-muted hover:text-white">Close</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {filteredLinks.map((link) => (
                <NavLink 
                  item={link} 
                  key={link.title} 
                  mobile
                  onClick={() => setOpen(false)}
                />
              ))}
              {session?.user ? (
                <>
                  {session.user?.isAdmin ? (
                    <NavLink 
                      item={{ title: "Dashboard", path: "/admin" }} 
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
                  <form action={handleLogout}>
                    <button 
                      type="submit"
                      className="w-full text-left px-6 py-4 rounded-2xl text-red-400 font-bold uppercase tracking-widest text-sm hover:bg-red-400/10 transition-all"
                    >
                      Logout Session
                    </button>
                  </form>
                </>
              ) : (
                <NavLink 
                  item={{ title: "Login", path: "/login" }} 
                  mobile
                  onClick={() => setOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
