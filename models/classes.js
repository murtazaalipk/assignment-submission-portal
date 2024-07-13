import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  title: {
   type:String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a Student model
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  Days: {
    type: String,
    required: true
  },
});

export default mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema, "submissions");
