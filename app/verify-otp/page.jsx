"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    
    // We will create this simple fetch call to a route handler
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      router.push("/register?status=approved_pending");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid OTP");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-2">Verify Email</h2>
        <p className="text-gray-400 text-sm mb-8">We sent a 6-digit code to <br/><span className="text-gray-800 font-bold">{email}</span></p>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold">{error}</div>}

        <form onSubmit={handleVerify} className="space-y-6">
          <input 
            type="text" 
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="w-full text-center text-4xl tracking-[0.5em] font-black p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-secondary outline-none transition-all"
            required
          />
          <button 
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {loading ? "VERIFYING..." : "CONFIRM CODE"}
          </button>
        </form>
      </div>
    </div>
  );
}