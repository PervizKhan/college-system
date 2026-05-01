import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    // Fetch only students who are NOT approved
    const pending = await User.find({ role: "student", isApproved: false });
    return NextResponse.json(pending);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}