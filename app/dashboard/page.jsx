"use client";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileRes = await fetch("/api/user/profile"); 
        if (profileRes.ok) {
          const data = await profileRes.json();
          setUserData(data);
        }

        const attendanceRes = await fetch("/api/attendance/today");
        if (attendanceRes.ok) {
          const attendanceData = await attendanceRes.json();
          setAttendance(attendanceData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">
              {userData?.name ? `Hi, ${userData.name.split(' ')[0]}` : "Portal"}
            </h1>
            <p className="text-gray-400 font-bold text-xs md:text-sm tracking-widest uppercase mt-2">
              Oxford Group of Colleges — {userData?.role || 'Guest'}
            </p>
          </div>
          
          {/* ACTION BUTTON: Dynamic based on role */}
          {userData?.role === 'instructor' && (
            <Link href="/attendance" className="bg-primary text-secondary px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all text-center">
              Mark Today's Attendance
            </Link>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard 
                title="Your Status" 
                value={userData?.isApproved ? "Active" : "Pending"} 
                color={userData?.isApproved ? "bg-green-500" : "bg-yellow-400"} 
              />
              <StatCard title="Class" value={userData?.className || userData?.assignedClass || "N/A"} color="bg-blue-500" />
              <StatCard title="Exam Day" value="May 15" color="bg-red-500" />
            </div>

            {/* Attendance Insight */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h2 className="font-black uppercase tracking-tighter text-xl mb-6 text-gray-900">Today's Presence Summary</h2>
              {attendance.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl text-center">
                   <p className="text-gray-400 font-bold text-sm">NO DATA SUBMITTED YET TODAY</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendance.map((record) => (
                    <div key={record._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase mb-1">{record.className} Class</p>
                        <p className="font-bold text-gray-800">Attendance completed by instructor</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-xl font-black text-gray-900">{record.students.filter(s => s.status === 'Present').length}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Present</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black text-red-500">{record.students.filter(s => s.status === 'Absent').length}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Absent</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Announcements */}
          <div className="space-y-8">
            <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-xl">
              <h2 className="font-black uppercase tracking-tighter text-xl mb-4 text-primary">Notice Board</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-primary text-[10px] font-black uppercase mb-1">DIT Enrollment</p>
                  <p className="text-sm font-bold text-gray-300">Last date for DIT 2026 is May 15. No seats limited!</p>
                </div>
                <div>
                  <p className="text-primary text-[10px] font-black uppercase mb-1">Daily Schedule</p>
                  <p className="text-sm font-bold text-gray-300">All IT classes begin promptly at 1:00 PM.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</h3>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
    </div>
  );
}