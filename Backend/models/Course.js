import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);