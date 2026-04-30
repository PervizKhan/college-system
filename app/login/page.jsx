"use client";
import { loginUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl font-black text-primary text-center mb-8 tracking-tighter uppercase">Sign In</h2>
        <form action={async (fd) => { await loginUser(fd); window.location.href="/dashboard"; }} className="space-y-5">
          <input name="email" type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary outline-none" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-primary outline-none" required />
          <button className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:bg-primary-dark transition-all">LOGIN</button>
        </form>
        <p className="text-center mt-8 text-sm font-medium">New? <Link href="/register" className="text-secondary font-bold">Register Now</Link></p>
      </div>
    </div>
  );
}