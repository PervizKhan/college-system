import dbConnect from "@/lib/dbConnect";
import Attendance from "@/lib/models/Attendance";
import User from "@/lib/models/User";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { students } = await req.json();

    // 1. Get Session & Instructor
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await decrypt(token);
    // Clean the ID to prevent CastError
    const cleanId = JSON.parse(JSON.stringify(decoded.id));
    
    const instructor = await User.findById(cleanId);
    if (!instructor) return NextResponse.json({ error: "Instructor not found" }, { status: 404 });

    // 2. Create the Record
    // We lock the className to the instructor's assignedClass
    await Attendance.create({
      date: new Date(),
      instructorId: instructor._id,
      className: instructor.assignedClass, 
      students: students.map(s => ({
        studentId: s._id,
        name: s.name,
        status: s.status
      }))
    });

    return NextResponse.json({ success: true, message: "Attendance submitted successfully!" });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}