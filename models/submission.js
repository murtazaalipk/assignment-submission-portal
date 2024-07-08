import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a Student model
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  urlSubmission: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

export default mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema, "submissions");
