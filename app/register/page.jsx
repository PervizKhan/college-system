"use client";
import { useState } from "react";
import { registerUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData) {
    setLoading(true);
    setError("");
    
    const res = await registerUser(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // Redirect to login with a success message
      router.push("/login?message=Account created successfully!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Responsive Card: Full width on mobile, max-width on laptop */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-8 md:p-12 w-full max-w-md lg:max-w-lg border-4 border-white/20 backdrop-blur-sm">
        
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">
            Create Account
          </h2>
          <div className="h-1.5 w-16 bg-secondary mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-4">
            Official Student Portal
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 text-center animate-pulse">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Full Name */}
          <div className="group">
            <input 
              name="name" 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium" 
              required 
            />
          </div>

          {/* Email */}
          <div className="group">
            <input 
              name="email" 
              type="email" 
              placeholder="College Email" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium" 
              required 
            />
          </div>

          {/* Password Grid: Stacks on mobile, side-by-side on tablet/laptop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium" 
              required 
            />
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium" 
              required 
            />
          </div>
          
          <button 
            disabled={loading}
            className="w-full py-4 md:py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-primary-dark active:scale-95 transition-all uppercase tracking-widest mt-4 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary font-black hover:underline decoration-2">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}