import Course from "../models/Course.js";

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
    const course = await Course.findOne({ name });
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Server error" });
  }
};
