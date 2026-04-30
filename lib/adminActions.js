"use server";
import dbConnect from "./dbConnect";
import User from "./models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createInstructor(formData) {
  await dbConnect();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "This email is already registered." };

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user with 'instructor' role
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor" // Crucial for middleware protection
    });

    revalidatePath("/admin"); // Refresh admin page data
    return { success: "Instructor account created successfully!" };
  } catch (error) {
    return { error: "Failed to create instructor. Try again." };
  }
}