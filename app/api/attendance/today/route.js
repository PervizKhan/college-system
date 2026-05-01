import dbConnect from "@/lib/dbConnect";
import Attendance from "@/lib/models/Attendance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Set range to today only (00:00:00 to 23:59:59)
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todayAttendance = await Attendance.find({
      date: { $gte: start, $lte: end }
    }).populate("students.studentId", "name");

    return NextResponse.json(todayAttendance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch today's data" }, { status: 500 });
  }
}