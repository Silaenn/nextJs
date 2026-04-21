"use client";

import { useState } from "react";
import NavLink from "./navLink/navLink";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Case Studies",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  // Filter links: Hide Homepage, About, and Contact if user is logged in
  const filteredLinks = session?.user 
    ? links.filter(link => link.path !== "/" && link.path !== "/about" && link.path !== "/contact")
    : links;

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {filteredLinks.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin ? (
              <NavLink item={{ title: "Dashboard", path: "/admin" }} />
            ) : (
              <NavLink item={{ title: "Workspace", path: "/workspace" }} />
            )}
            <form action={handleLogout}>
              <button 
                type="submit"
                className="ml-2 px-4 py-2 text-sm font-medium text-textSoft hover:text-white bg-bgSoft hover:bg-gray-600 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Sign In", path: "/login" }} />
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-textSoft hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-bg border-b border-bgSoft animate-slideIn max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container-custom py-4 flex flex-col gap-2">
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
                    className="w-full text-left px-4 py-3 text-textSoft hover:text-white hover:bg-bgSoft rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <NavLink 
                item={{ title: "Sign In", path: "/login" }} 
                mobile
                onClick={() => setOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Links;
