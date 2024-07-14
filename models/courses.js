import mongoose, { Schema, models } from "mongoose";

const coursesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Course = models.Course || mongoose.model("Course", coursesSchema);
export default Course;
