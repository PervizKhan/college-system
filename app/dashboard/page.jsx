"use client";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({ totalStudents: 0, totalInstructors: 0 });
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Get User Profile
        const profileRes = await fetch("/api/user/profile"); 
        if (profileRes.ok) {
          const data = await profileRes.json();
          setUserData(data);
        }

        // 2. Get Today's Attendance Summary
        const attendanceRes = await fetch("/api/attendance/today");
        if (attendanceRes.ok) {
          const attendanceData = await attendanceRes.json();
          setAttendance(attendanceData);
        }

        // 3. Get College Stats (If Admin)
        const statsRes = await fetch("/api/admin/stats"); // You'll need to create this simple API
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-20 font-black text-center animate-pulse">LOADING PORTAL...</div>;

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">
              {userData?.name?.split(' ')[0]}'s Space
            </h1>
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase mt-2">
              {userData?.role} Portal — Oxford Group of Colleges
            </p>
          </div>

          {/* DYNAMIC ACTION BUTTONS */}
          <div className="flex gap-4">
            {userData?.role === 'admin' && (
              <Link href="/admin" className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg">
                Enter Admin Panel
              </Link>
            )}
            {userData?.role === 'instructor' && (
              <Link href="/attendance" className="bg-primary text-secondary px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg">
                Mark Attendance
              </Link>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: ROLE SPECIFIC CONTENT --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. ADMIN VIEW: College Overview */}
            {userData?.role === 'admin' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard title="Total Students" value={stats.totalStudents} color="bg-blue-600" />
                <StatCard title="Total Instructors" value={stats.totalInstructors} color="bg-purple-600" />
              </div>
            )}

            {/* 2. INSTRUCTOR VIEW: Class Insight */}
            {userData?.role === 'instructor' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard title="Assigned Class" value={userData?.assignedClass} color="bg-primary" />
                <StatCard title="Today's Status" value={attendance.some(a => a.className === userData.assignedClass) ? "Completed" : "Pending"} color="bg-green-500" />
              </div>
            )}

            {/* 3. STUDENT VIEW: Personal Progress */}
            {userData?.role === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard title="My Class" value={userData?.className} color="bg-orange-500" />
                <StatCard title="Course Access" value={userData?.isApproved ? "Full Access" : "Locked"} color="bg-red-500" />
              </div>
            )}

            {/* SHARED COMPONENT: Today's Attendance Activity */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h2 className="font-black uppercase tracking-tighter text-xl mb-6 text-gray-900">Live Campus Activity</h2>
              {attendance.length === 0 ? (
                <p className="text-gray-400 italic">No attendance data has been submitted for the 1:00 PM session yet.</p>
              ) : (
                <div className="space-y-4">
                  {attendance.map((record) => (
                    <div key={record._id} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all">
                      <span className="font-black text-gray-800 uppercase text-sm">{record.className} Class</span>
                      <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Marked</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: NOTICES & SIDEBAR --- */}
          <div className="space-y-8">
            <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-primary">
              <h2 className="font-black uppercase tracking-tighter text-2xl mb-6">Important</h2>
              <ul className="space-y-6">
                <li className="border-b border-gray-800 pb-4">
                  <p className="text-primary text-[10px] font-black uppercase mb-1">DIT 2026 Enrollment</p>
                  <p className="text-sm font-bold">Last date to apply is May 15. Open to all students!</p>
                </li>
                <li>
                  <p className="text-primary text-[10px] font-black uppercase mb-1">Class Schedule</p>
                  <p className="text-sm font-bold">All 9th and 10th classes start at 1:00 PM daily.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
      <div className={`absolute left-0 top-0 w-2 h-full ${color}`}></div>
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-4xl font-black text-gray-900 mt-2">{value}</p>
    </div>
  );
}