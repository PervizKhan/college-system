import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // --- BASIC IDENTITY ---
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    // --- INSTRUCTOR SPECIFIC ---
    // This is where you assign them to 9th or 10th grade
    assignedClass: { 
      type: String, 
      enum: ["9th", "10th", "DIT"],
      required: function() { return this.role === 'instructor'; } 
    },

    // --- STUDENT SPECIFIC / SECURITY GATES ---
    isApproved: { 
      type: Boolean, 
      default: false 
    }, // Manual Admin Gate for students
    
    otp: { 
      type: String 
    }, // 6-digit verification code
    
    otpExpires: { 
      type: Date 
    }, // Set to 10 minutes from creation
    
    otpAttempts: { 
      type: Number, 
      default: 0 
    }, // Tracks failed tries (3 strikes rule)
  },
  { 
    // Automatically adds 'createdAt' and 'updatedAt'
    timestamps: true 
  }
);

// This ensures we don't redefine the model if it already exists
export default mongoose.models.User || mongoose.model("User", UserSchema);