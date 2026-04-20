"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item, mobile = false, onClick }) => {
  const pathName = usePathname();
  const isActive = pathName === item.path;

  const baseClasses = "transition-all duration-200 font-medium";
  const desktopClasses = `px-4 py-2 rounded-lg ${
    isActive
      ? "bg-primary text-white"
      : "text-textSoft hover:text-white hover:bg-bgSoft"
  }`;
  
  const mobileClasses = `w-full px-4 py-3 rounded-lg ${
    isActive
      ? "bg-primary text-white"
      : "text-textSoft hover:text-white hover:bg-bgSoft"
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
