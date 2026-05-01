"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";
import Link from "next/link";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- NEW: Form State to persist data ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Helper to update state as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (searchParams.get("status") === "approved_pending") setIsSuccess(true);
  }, [searchParams]);

  async function clientAction() {
    setLoading(true);
    setError("");

    // Create FormData object from our state
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);

    const res = await registerUser(data);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
      // Notice: We don't clear formData here, so inputs stay filled!
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6 text-white">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-block p-4 bg-white/10 rounded-full">
             <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Application Sent</h1>
          <p className="text-white/70 mb-8 font-medium">Thank you for applying to the Oxford Group of Colleges. Your DIT registration is pending admin approval.</p>
          <button onClick={() => router.push("/login")} className="px-8 py-4 bg-secondary text-primary font-black rounded-xl uppercase tracking-widest hover:scale-105 transition-all">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Branding Side */}
      <div className="hidden lg:flex bg-primary p-12 flex-col justify-between text-white">
        <div>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tighter">Oxford Group <br/><span className="text-secondary text-3xl">Of Colleges</span></h2>
        </div>
        <div className="space-y-4">
          <p className="text-6xl font-black text-white/10 uppercase">DIT 2026</p>
          <p className="text-sm font-bold tracking-widest text-secondary uppercase">Enrollment Open until May 15</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-2">Create Account</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">Official Student Portal</p>

          {error && <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl border-2 border-red-100 text-sm font-black animate-shake">{error}</div>}

          {/* Changed 'action' to 'onSubmit' for better control with state */}
          <form onSubmit={(e) => { e.preventDefault(); clientAction(); }} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Full Name</label>
              <input 
                name="name" 
                type="text" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold bg-gray-50/50" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">College Email</label>
              <input 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="name@college.com" 
                className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold bg-gray-50/50" 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold bg-gray-50/50" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Confirm</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold bg-gray-50/50" 
                  required 
                />
              </div>
            </div>

            <button disabled={loading} className="w-full py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-primary/20 disabled:opacity-50 mt-6">
              {loading ? "Processing..." : "Submit Registration"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-400 uppercase tracking-tight">
            Already registered? <Link href="/login" className="text-primary hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}