import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const pending = await User.find({ isApproved: false, role: "student" }).select("name email");
  const instructors = await User.countDocuments({ role: "instructor" });
  return NextResponse.json({ pending, instructors });
}