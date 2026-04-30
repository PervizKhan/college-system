"use client";
import { useState, useEffect } from "react";
import { approveUser, createInstructor } from "@/lib/actions";

export default function AdminDashboard() {
  const [view, setView] = useState("instructors"); // 'instructors' or 'pending'
  const [pendingUsers, setPendingUsers] = useState([]);
  const [instructorCount, setInstructorCount] = useState(0);

  // Since we are in a Client Component, we fetch the counts/list on mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setPendingUsers(data.pending);
      setInstructorCount(data.instructors);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-primary tracking-tighter uppercase">Control Center</h1>
        <div className="flex justify-center gap-4 mt-8">
          {/* NAVIGATION BUTTONS */}
          <button 
            onClick={() => setView("instructors")}
            className={`px-8 py-4 rounded-2xl font-black transition-all ${
              view === "instructors" ? "bg-primary text-white shadow-xl scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            MANAGE TEACHERS
          </button>
          <button 
            onClick={() => setView("pending")}
            className={`px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 ${
              view === "pending" ? "bg-secondary text-white shadow-xl scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
          >
            PENDING STUDENTS
            {pendingUsers.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse">
                {pendingUsers.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* VIEW 1: TEACHER CREATION */}
        {view === "instructors" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-800 uppercase">Register New Faculty</h2>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Staff</p>
                  <p className="text-3xl font-black text-secondary">{instructorCount}</p>
                </div>
              </div>
              
              <form action={createInstructor} className="space-y-4">
                <input name="name" placeholder="Instructor Name" className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-primary font-bold" required />
                <input name="email" type="email" placeholder="Official Email" className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-primary font-bold" required />
                <input name="password" placeholder="Assign Login Password" className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-primary font-mono" required />
                <button className="w-full py-5 bg-primary text-white font-black rounded-2xl mt-6 shadow-lg shadow-blue-200 hover:bg-black transition-all uppercase tracking-widest">
                  Create Instructor Account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 2: PENDING APPROVALS */}
        {view === "pending" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h2 className="text-2xl font-black text-gray-800 uppercase mb-6">Approval Queue</h2>
            {pendingUsers.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">Boom! All caught up. No pending requests.</p>
              </div>
            ) : (
              pendingUsers.map((user) => (
                <div key={user._id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-all">
                  <div className="text-center md:text-left">
                    <p className="font-black text-gray-900 text-lg uppercase">{user.name}</p>
                    <p className="text-sm text-gray-400 font-medium">{user.email}</p>
                  </div>
                  <form action={async () => {
                    await approveUser(user._id);
                    // Update local state to remove the approved user immediately
                    setPendingUsers(pendingUsers.filter(u => u._id !== user._id));
                  }}>
                    <button className="bg-secondary text-white px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-purple-100">
                      APPROVE ACCESS
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}