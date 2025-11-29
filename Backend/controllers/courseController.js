import Course from "../models/Course.js";
import File from "../models/File.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// GET /api/courses?limit=10&search=...
export const getCourses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (!search || search.trim() === "") {
      // Return 10 random courses when search is empty
      const randomCourses = await Course.aggregate([{ $sample: { size: 10 } }]);
      return res.json(randomCourses);
    }

    // Search by name or title (case-insensitive)
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ],
    };

    const courses = await Course.find(query).limit(limit);
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/courses/:name
export const getCourseByName = async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);

    // Correct: findOne with a filter object
    const course = await Course.findOne({ name }).populate("files");
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${basename}${ext}`);
  },
});

const upload = multer({ storage });

export const uploadCourseFile = [
  upload.single("file"),

  async (req, res) => {
    try {
      const courseName = req.params.name;
      const file = req.file;

      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const course = await Course.findOne({ name: courseName });
      if (!course) return res.status(404).json({ error: "Course not found" });

      const savedFile = await File.create({
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        uploadedBy: req.user?._id || null, // optional if no auth yet
        course: course._id,
        fileType: file.mimetype.startsWith("image/") ? "image"
          : file.mimetype.startsWith("video/") ? "video"
          : file.mimetype === "application/pdf" ? "document"
          : "other",
      });

      if (!course.files) course.files = [];


      course.files.push(savedFile._id);
      await course.save();

      res.json({ success: true, file: savedFile });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
];
