import dbConnect from "@/lib/dbConnect";
import Attendance from "@/lib/models/Attendance";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    await dbConnect();

    // 1. Get Today's Date Range (00:00:00 to 23:59:59)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 2. Fetch Today's Attendance Records
    const records = await Attendance.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!records || records.length === 0) {
      return NextResponse.json({ error: "No records found today" }, { status: 404 });
    }

    // 3. Format Data for Excel
    const excelData = [];
    records.forEach((record) => {
      record.students.forEach((s) => {
        excelData.push({
          Date: record.date.toLocaleDateString(),
          Class: record.className,
          "Student Name": s.name || "N/A",
          Status: s.status,
        });
      });
    });

    // 4. Create Workbook and Worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // 5. Write to Buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // 6. Return as Downloadable File
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="Attendance_${new Date().toISOString().split('T')[0]}.xlsx"`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}