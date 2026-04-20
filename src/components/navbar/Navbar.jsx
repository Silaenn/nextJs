import Link from "next/link";
import React from "react";
import Links from "./links/Links";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-bgSoft/50">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          IdeaReality
        </Link>
        <Links session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
