import Link from "next/link";
import React from "react";

type PropsType = {
  text: string;
  icon: React.ReactNode;
  href: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserMenuLink = ({ text, icon, href, setIsOpen }: PropsType) => {
  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default UserMenuLink;
