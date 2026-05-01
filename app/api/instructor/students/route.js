import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    
    if (!token) {
      return new Response(JSON.stringify({ error: "No session found" }), { status: 401 });
    }

    const decoded = await decrypt(token);
    const instructorId = decoded.id.toString();
    if (!decoded || !decoded.id) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    // 1. Find the logged-in instructor first
    const instructor = await User.findById(instructorId);
    
    if (!instructor) {
      return new Response(JSON.stringify({ error: "Instructor not found in database" }), { status: 404 });
    }

    // 2. Fetch only approved students matching the instructor's assignedClass
    const students = await User.find({ 
      role: "student", 
      className: instructor.assignedClass, 
      isApproved: true 
    }).select("name _id");

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}