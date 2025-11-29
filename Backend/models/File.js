import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    fileType: { type: String, enum: ["document", "image", "video", "other"], default: "other" },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);