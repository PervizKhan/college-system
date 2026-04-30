// models/Attendance.js
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Present', 'Absent'], default: 'Present' }
  }]
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);