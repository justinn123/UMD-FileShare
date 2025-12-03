import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    pinnedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
