"use client";
import { useState } from "react";
import { createInstructor } from "@/lib/actions";

export default function CreateInstructorPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData) {
    setLoading(true);
    const res = await createInstructor(formData);
    setLoading(false);
    
    if (res?.error) setMessage(`❌ ${res.error}`);
    else setMessage("✅ Instructor created and assigned successfully!");
  }

  return (
    <div className="max-w-2xl mx-auto p-12">
      <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Add Instructor</h1>
      
      <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
          <input name="name" type="text" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-secondary" required />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
          <input name="email" type="email" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-secondary" required />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
          <input name="password" type="password" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-secondary" required />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Assign Class</label>
          <select name="assignedClass" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-secondary font-bold" required>
            <option value="9th">9th Class</option>
            <option value="10th">10th Class</option>
            <option value="DIT">DIT 2026</option>
          </select>
        </div>

        <button disabled={loading} className="w-full py-4 bg-primary text-secondary font-black rounded-2xl uppercase tracking-widest hover:bg-black transition-all">
          {loading ? "CREATING..." : "CREATE ACCOUNT"}
        </button>

        {message && <p className="text-center font-bold text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
}