import Link from "next/link";
import React from "react";
import Links from "./links/Links";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-[100] px-3 sm:px-4 pointer-events-none">
      <nav className="container-custom max-w-5xl h-14 sm:h-16 glass rounded-full flex items-center justify-between px-4 sm:px-6 pointer-events-auto">
        <Link
          href="/"
          className="text-lg sm:text-xl font-black tracking-tighter hover:scale-105 transition-transform duration-300"
        >
          <span className="text-white">IDEA</span>
          <span className="text-accent italic">REALITY.</span>
        </Link>
        <Links session={session} />
      </nav>
    </div>
  );
};

export default Navbar;
