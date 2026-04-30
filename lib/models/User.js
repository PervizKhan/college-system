import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  
  // New Security Gates
  isApproved: { type: Boolean, default: false }, // Manual Admin Gate
  otp: { type: String },                         // Email OTP Gate
  otpExpires: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);