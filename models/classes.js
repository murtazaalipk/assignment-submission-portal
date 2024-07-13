import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model("Class", classesSchema, "classes");
