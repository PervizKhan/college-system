"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // This is where you'd normally check your 'session' cookie
    // For now, we'll just simulate a check
    const checkAuth = async () => {
      // Logic to verify user...
      setIsChecking(false);
    };
    
    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg animate-pulse text-blue-600 font-medium">
          Verifying Credentials...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}