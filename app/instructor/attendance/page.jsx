"use client";
import { useState, useEffect } from "react";

export default function MarkAttendance() {
  const [students, setStudents] = useState([
    { id: "1", name: "Student A", present: true },
    { id: "2", name: "Student B", present: true },
    // This will eventually fetch from your database
  ]);

  const toggleStudent = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, present: !s.present } : s
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10">
      <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100">
        <h2 className="text-3xl font-black text-primary mb-2 uppercase">Daily Attendance</h2>
        <p className="text-gray-400 text-sm mb-8 font-bold">DATE: {new Date().toLocaleDateString()}</p>

        <div className="space-y-3">
          {students.map((student) => (
            <div 
              key={student.id}
              onClick={() => toggleStudent(student.id)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                student.present ? "bg-primary/5 border-primary/20" : "bg-red-50 border-red-200"
              }`}
            >
              <span className={`font-bold ${student.present ? "text-primary" : "text-red-600"}`}>
                {student.name}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                student.present ? "bg-primary border-primary text-white" : "bg-white border-red-200"
              }`}>
                {student.present && "✓"}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 py-4 bg-primary text-white font-black rounded-2xl shadow-lg hover:bg-primary-dark transition-all">
          SUBMIT ATTENDANCE
        </button>
      </div>
    </div>
  );
}