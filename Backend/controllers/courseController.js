import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// GET /api/courses?limit=10&search=...
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (!search || search.trim() === "") {
      const randomCourses = await Course.aggregate([{ $sample: { size: 10 } }]);
      return res.json(randomCourses);
    }

    // Build query: if search is empty, fetch all; otherwise filter by name/title
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const courses = await Course.find(query).limit(limit);

    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
