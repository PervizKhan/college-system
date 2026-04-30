"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Attendance() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>📋 Attendance Page</h1>
      <p>Only logged-in users can see this.</p>
    </div>
  );
}