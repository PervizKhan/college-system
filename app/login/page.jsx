"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react"; // Added useState
import { loginUser } from "@/lib/actions"; // Imported your action
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  
  // 1. Added state for handling errors and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Client-side handler for the Server Action
  async function handleLogin(formData) {
    setLoading(true);
    setError("");
    
    const res = await loginUser(formData);
    
    // If there's an error (like pending approval), display it
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
    // Note: Success redirect happens automatically inside loginUser
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-6">
      <div className="w-full max-w-[450px] space-y-8">
        
        <div className="text-center">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">Login</h1>
          <p className="text-secondary font-black text-xs uppercase tracking-[0.3em] mt-2">Oxford Group Portal</p>
        </div>

        {/* 3. Displaying server-side error messages (e.g., "Account pending Admin approval") */}
        {(message || error) && (
          <div className={`p-5 border-2 rounded-2xl ${error ? 'bg-red-500/10 border-red-500/50' : 'bg-secondary/10 border-secondary/20'}`}>
            <p className={`${error ? 'text-red-500' : 'text-secondary'} text-[10px] font-black uppercase tracking-widest mb-1`}>
              {error ? "Login Error" : "Status Update"}
            </p>
            <p className="text-white text-sm font-medium leading-relaxed">{error || message}</p>
          </div>
        )}

        {/* 4. Connected form to handleLogin action */}
        <form action={handleLogin} className="space-y-4">
          <div className="group">
            <input 
              name="email" // Added name attribute for formData
              type="email" 
              placeholder="COLLEGE EMAIL" 
              className="w-full p-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white outline-none focus:border-secondary focus:bg-white/10 transition-all font-bold placeholder:text-white/20" 
              required 
            />
          </div>
          <div className="group">
            <input 
              name="password" // Added name attribute for formData
              type="password" 
              placeholder="PASSWORD" 
              className="w-full p-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white outline-none focus:border-secondary focus:bg-white/10 transition-all font-bold placeholder:text-white/20" 
              required 
            />
          </div>
          
          {/* 5. Disabled button while loading */}
          <button 
            disabled={loading}
            className="w-full py-5 bg-secondary text-primary font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-secondary/10 disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "Access Dashboard"}
          </button>
        </form>

        <div className="text-center pt-6">
          <Link href="/register" className="text-white/40 font-black uppercase text-xs tracking-widest hover:text-secondary transition-colors">
            No Account? <span className="text-white border-b border-white/20">Register for DIT</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary flex items-center justify-center text-white font-black italic">LOADING...</div>}>
      <LoginContent />
    </Suspense>
  );
}