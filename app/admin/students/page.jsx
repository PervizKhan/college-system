"use client";
import { useEffect, useState } from "react";

export default function PendingStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch students where isApproved is false
    fetch("/api/admin/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  const handleApprove = async (id) => {
    const res = await fetch(`/api/admin/approve/${id}`, { method: "POST" });
    if (res.ok) {
      // Remove approved student from the local list
      setStudents(students.filter((s) => s._id !== id));
    }
  };

  if (loading) return <p>Loading Students...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Registrations</h1>
      {students.length === 0 ? (
        <p>No students waiting for approval. Boom!</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">
                  <button 
                    onClick={() => handleApprove(student._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}