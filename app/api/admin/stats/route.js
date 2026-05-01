import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalInstructors = await User.countDocuments({ role: "instructor" });
  
  return NextResponse.json({ totalStudents, totalInstructors });
}