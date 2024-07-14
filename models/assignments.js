import mongoose, { Schema, models } from "mongoose";

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
    },
    submitted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
  },
  { timestamps: true }
);

const Assignment =
  models.Assignment || mongoose.model("Assignment", assignmentSchema);
export default Assignment;
