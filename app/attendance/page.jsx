"use client";
import { useState, useEffect } from "react";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [instructorInfo, setInstructorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAttendance() {
      // 1. Get instructor's assigned class from their profile
      const userRes = await fetch("/api/user/profile");
      const userData = await userRes.json();
      setInstructorInfo(userData);

      // 2. Fetch students only for that specific class
      const res = await fetch(`/api/instructor/students`);
      if (res.ok) {
        const data = await res.json();
        console.log("Fetched Students:", data); // Check your browser console!
        // Set initial state: all students checked (Present)
        setStudents(data.map((s) => ({ ...s, status: "Present" })));
      }
      setLoading(false);
    }
    initAttendance();
  }, []);

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s._id === id
          ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
          : s,
      ),
    );
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/attendance/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students }), // Class is handled server-side
    });
    if (res.ok) alert("Attendance saved and exported to Excel!");
  };

  if (loading)
    return (
      <div className="p-20 font-black text-center">
        LOADING {instructorInfo?.assignedClass} LIST...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-black text-primary uppercase mb-2">
          Daily Attendance
        </h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">
          Class: {instructorInfo?.assignedClass} | Date:{" "}
          {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-secondary transition-all"
            >
              <span className="font-bold text-gray-800">{student.name}</span>
              <input
                type="checkbox"
                checked={student.status === "Present"}
                onChange={() => toggleStatus(student._id)}
                className="w-7 h-7 accent-primary cursor-pointer"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-10 py-5 bg-primary text-secondary font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all shadow-lg"
        >
          Submit & Save to Excel
        </button>
      </div>
    </div>
  );
}
