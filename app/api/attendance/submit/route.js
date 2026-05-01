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

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const decoded = await decrypt(token);
    
    // Convert ID to a clean string to avoid Mongoose CastErrors
    const cleanId = JSON.parse(JSON.stringify(decoded.id));
    const instructor = await User.findById(cleanId);

    // DEBUG: Check if instructor or their class is missing
    if (!instructor) {
      return NextResponse.json({ error: "Instructor account not found in database." }, { status: 404 });
    }

    if (!instructor.assignedClass) {
      return NextResponse.json({ 
        error: `Instructor ${instructor.name} does not have an 'assignedClass' (e.g., 9th, 10th) set in their profile.` 
      }, { status: 400 });
    }

    const newRecord = await Attendance.create({
      date: new Date(),
      instructorId: instructor._id,
      className: instructor.assignedClass, // This is the field failing validation
      students: students.map(s => ({
        studentId: s.studentId,
        name: s.name,
        status: s.status
      }))
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}