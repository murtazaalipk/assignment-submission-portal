import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    role: {
      type: String,
      default: "student",
      enum: ["teacher", "student" , "admin"],
      required:true
    },
  },
  { timestamps: true }
);

const User = models?.User || mongoose.model("User", userSchema);
export default User;
