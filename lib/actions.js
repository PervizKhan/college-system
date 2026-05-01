"use server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sendOTPEmail } from "./email";

// Validation Helper
const validatePassword = (pass) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(pass);
};

// --- REGISTRATION ACTION ---
export async function registerUser(formData) {
  await dbConnect();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!name || !email || !password)
    return { error: "All fields are required." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };

  if (!validatePassword(password)) {
    return {
      error:
        "Password must be 8+ chars with Uppercase, Lowercase, Number, and Special Character.",
    };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "This email is already registered." };

  const hashedPassword = await bcrypt.hash(password, 12);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      isApproved: false,
      otp: otp,
      otpExpires: Date.now() + 600000,
    });
    await sendOTPEmail(email, otp);
  } catch (error) {
    return { error: "Registration failed. Please try again." };
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

  if (!user.isApproved) {
    return { error: "Account pending Admin approval. Please wait." };
  }

  const session = await encrypt({
    id: user._id.toString(),
    role: user.role,
    name: user.name,
  });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/dashboard");
}

// --- ADMIN: APPROVE STUDENT ACTION ---
export async function approveUser(userId) {
  await dbConnect();
  await User.findByIdAndUpdate(userId, { isApproved: true });
  revalidatePath("/admin");
  return { success: "Student approved successfully!" };
}

// --- ADMIN: CREATE INSTRUCTOR ACTION ---
export async function createInstructor(formData) {
  try {
    await dbConnect();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const assignedClass = formData.get("assignedClass");

    if (!name || !email || !password || !assignedClass) {
      return { error: "All fields are required, including class assignment." };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return { error: "Instructor with this email already exists." };

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor",
      assignedClass,
      isApproved: true,
    });

    revalidatePath("/admin/instructor"); // Good practice to refresh the page
    return { success: true };
  } catch (error) {
    console.error("Error creating instructor:", error);
    return { error: "Database error. Please try again." };
  }
}

// --- LOGOUT ---
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/login");
}
