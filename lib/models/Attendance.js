import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  className: { type: String, required: true }, // e.g., "9th", "10th", or "DIT"
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      status: { type: String, enum: ["Present", "Absent"], default: "Present" },
    },
  ],
});

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
