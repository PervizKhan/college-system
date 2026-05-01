import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    
    // FIX: Unwrapping params as a Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Update the user: set isApproved to true
    // Updated 'new: true' to 'returnDocument: after' to fix Mongoose warning
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isApproved: true },
      { returnDocument: 'after' } 
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Student approved successfully", 
      user: updatedUser 
    }, { status: 200 });

  } catch (error) {
    console.error("Approval Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}