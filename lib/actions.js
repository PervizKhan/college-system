"use server";
// Use @ alias to avoid path errors
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendOTPEmail } from "./email";

// --- REGISTRATION ACTION ---
export async function registerUser(formData) {
  await dbConnect();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "Email already exists" };

  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Generate 6-digit OTP for email gate
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
    isApproved: false, // Manual Admin gate
    otp: otp,
    otpExpires: Date.now() + 600000 // 10 mins
  });

  // REAL LOGIC BOOM:
  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    console.error("Email failed to send:", error);
    // You might want to return an error to the user here
  }

  redirect(`/verify-otp?email=${email}`);
}

// --- LOGIN ACTION ---
export async function loginUser(formData) {
  await dbConnect();
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await User.findOne({ email });
  if (!user) return { error: "Invalid credentials" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid credentials" };

  // Verification Gate: Check if Admin has approved the student
  if (!user.isApproved) {
    return { error: "Account pending Admin approval. Please wait." };
  }

  const session = await encrypt({ id: user._id, role: user.role, name: user.name });
  const cookieStore = await cookies();
  cookieStore.set("session", session, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    path: "/" 
  });

  redirect("/dashboard");
}

// --- ADMIN: APPROVE STUDENT ACTION ---
// I removed the duplicate and kept this one
export async function approveUser(userId) {
  await dbConnect();
  await User.findByIdAndUpdate(userId, { isApproved: true });
  revalidatePath("/admin"); 
  return { success: "Student approved successfully!" };
}

// --- ADMIN: CREATE INSTRUCTOR ACTION ---
export async function createInstructor(formData) {
  await dbConnect();
  
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "Instructor already exists." };

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor",
      isApproved: true // Admin-created accounts are auto-approved
    });

    revalidatePath("/admin");
    return { success: "Instructor created!" };
  } catch (error) {
    return { error: "Failed to create instructor." };
  }
}

// --- LOGOUT ---
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/login");
}