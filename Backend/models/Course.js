import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: {type: String},
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);