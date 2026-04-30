import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
// ... existing imports

export async function POST(req) {
  await dbConnect();
  const { email, otp } = await req.json();

  const user = await User.findOne({ email, otp });

  if (!user) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  // Clear OTP but DO NOT set isApproved to true
  user.otp = undefined;
  await user.save();

  // Return success - the frontend will then redirect to a "Pending" message
  return NextResponse.json({ success: true });
}