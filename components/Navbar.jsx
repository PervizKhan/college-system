"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/actions";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (["/login", "/register"].includes(pathname)) return null;

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white text-primary px-2.5 py-1 rounded-xl font-black text-xl group-hover:scale-110 transition-transform">C</div>
          <span className="font-bold text-lg md:text-xl tracking-tighter uppercase">EduPortal</span>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
          <Link href="/dashboard" className="hover:text-secondary transition-colors">Dashboard</Link>
          <button onClick={() => logoutUser()} className="bg-secondary hover:bg-secondary-dark px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
            Sign Out
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white text-gray-800 p-6 space-y-4 shadow-2xl border-t border-gray-100">
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block font-bold text-lg p-2 rounded-lg hover:bg-gray-50">Dashboard</Link>
          <button onClick={() => logoutUser()} className="w-full text-left p-2 text-red-600 font-bold text-lg hover:bg-red-50 rounded-lg">Sign Out</button>
        </div>
      )}
    </nav>
  );
}