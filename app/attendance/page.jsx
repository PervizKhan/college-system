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
        // Set initial state: mapping fetched data to include default "Present" status
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
      )
    );
  };

 const handleSubmit = async () => {
    // 1. Map data to match the Backend Schema exactly
    const attendanceData = {
      students: students.map((s) => ({
        studentId: s._id, // Back-end expects 'studentId'
        name: s.name,     
        status: s.status,
      })),
    };

    try {
      const res = await fetch("/api/attendance/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData), 
      });

      const result = await res.json();

      if (res.ok) {
        alert("Attendance saved successfully!");
        // Optional: Redirect back to dashboard after success
        // window.location.href = "/dashboard";
      } else {
        // Show the specific error from the server (e.g., "className required")
        alert(`Error: ${result.error || "Failed to save"}`);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("System error. Check your internet connection.");
    }
  };

  if (loading)
    return (
      <div className="p-20 font-black text-center animate-pulse">
        LOADING {instructorInfo?.assignedClass || "CLASS"} LIST...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-primary uppercase mb-2">
            Daily Attendance
          </h1>
          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
              Class: <span className="text-gray-900">{instructorInfo?.assignedClass}</span>
            </p>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
              Date: <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </header>

        <div className="space-y-3">
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-primary transition-all group"
              >
                <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                  {student.name}
                </span>
                <input
                  type="checkbox"
                  checked={student.status === "Present"}
                  onChange={() => toggleStatus(student._id)}
                  className="w-7 h-7 accent-primary cursor-pointer rounded-lg"
                />
              </div>
            ))
          ) : (
            <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-gray-400 font-bold text-sm uppercase">No approved students found for this class.</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-10 py-5 bg-primary text-secondary font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-[0.98]"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}