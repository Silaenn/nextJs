"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item, mobile = false, onClick }) => {
  const pathName = usePathname();
  const isActive = item.path === "/" 
    ? pathName === "/" 
    : pathName.startsWith(item.path);

  const baseClasses = "transition-all duration-300 font-bold text-sm uppercase tracking-widest";
  
  const desktopClasses = `px-5 py-2 rounded-full ${
    isActive
      ? "bg-white text-bg font-black italic scale-105"
      : "text-muted hover:text-white hover:bg-white/5"
  }`;
  
  const mobileClasses = `w-full px-6 py-4 rounded-2xl ${
    isActive
      ? "bg-accent text-white"
      : "text-textSoft hover:text-white hover:bg-white/5"
  }`;

  return (
    <Link
      href={item.path}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
      onClick={onClick}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
