"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home Page", short: "Home" },
    { href: "/portfolio", label: "Pox Info", short: "Pox Info" },
    { href: "/services", label: "Guide", short: "Guide" },
    { href: "/contact", label: "About Us", short: "About" },
  ];

  return (
    <header className="flex flex-wrap justify-center items-center px-4 py-4 border-b border-black-300 sm:justify-between sm:flex-nowrap bg-[#F4F7FF]">
      <h1 className="w-full sm:w-1/4 text-[30px] font-bold text-[#292929] font-poppins text-center sm:text-center cursor-pointer tracking-widest">
        POXPOX
      </h1>

      <nav className="w-full sm:w-3/4 mt-2 sm:mt-0 flex justify-center sm:justify-center">
        <ul className="flex w-full justify-evenly list-none text-[15px] font-poppins text-[#292929]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-[20px] transition-all duration-300 ${
                    isActive
                      ? "bg-[#f06c19] text-white"
                      : "hover:bg-[#f06c19] hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">{link.short}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
