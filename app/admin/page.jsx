"use client";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/admin/export-attendance");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("No attendance records found for today.");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to generate Excel file.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
            Admin Control Panel
          </h1>
          <p className="text-gray-500 font-medium">Oxford Group of Colleges | Portal Management</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Navigation Card: Students */}
          <Link href="/admin/students" className="group">
            <div className="h-full p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Approvals</h2>
              <p className="text-gray-500">Review and approve pending student registrations for the new session.</p>
            </div>
          </Link>

          {/* Navigation Card: Instructors */}
          <Link href="/admin/instructor" className="group">
            <div className="h-full p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary transition-all duration-300">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Manage Instructors</h2>
              <p className="text-gray-500">Create new instructor accounts and assign them to 9th, 10th, or DIT classes.</p>
            </div>
          </Link>
        </div>

        {/* Attendance Export Section */}
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 uppercase">Daily Reports</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Generate a comprehensive Excel report of all student attendance submitted by instructors today.
            </p>
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all ${
                isExporting 
                ? "bg-gray-700 cursor-not-allowed" 
                : "bg-white text-gray-900 hover:bg-primary hover:text-white"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="FileTextIcon" />
              </svg>
              {isExporting ? "Generating..." : "Download Today's Excel"}
            </button>
          </div>
          {/* Decorative background shape */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}