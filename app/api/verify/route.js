import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
// ... existing imports

export async function POST(req) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 1. Check if the user is already blocked/invalidated
    if (user.otpAttempts >= 3) {
      return NextResponse.json({ 
        error: "Too many failed attempts. Please register again to get a new code." 
      }, { status: 403 });
    }

    // 2. Check for expiry first
    if (user.otpExpires < Date.now()) {
      return NextResponse.json({ error: "OTP expired." }, { status: 400 });
    }

    // 3. Validate the code
    if (user.otp !== otp) {
      user.otpAttempts += 1;
      
      // If this was the 3rd attempt, invalidate the OTP
      if (user.otpAttempts >= 3) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return NextResponse.json({ error: "Third wrong attempt. OTP invalidated." }, { status: 403 });
      }

      await user.save();
      const remaining = 3 - user.otpAttempts;
      return NextResponse.json({ error: `Invalid OTP. ${remaining} attempts remaining.` }, { status: 400 });
    }

    // 4. Success! Clear everything
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}