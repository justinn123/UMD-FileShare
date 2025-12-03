import User from "../models/User.js";

export const pinCourse = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const { courseId } = req.params;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { pinnedCourses: courseId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not pin course" });
  }
};

export const unpinCourse = async (req, res) => {
  const userId = req.headers["x-user-id"];
  const { courseId } = req.params;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { pinnedCourses: courseId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not unpin course" });
  }
};

export const getPinnedCourses = async (req, res) => {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(400).json({ pinnedCourses: [] });

  try {
    const user = await User.findById(userId);
    const pinned = user?.pinnedCourses?.map(id => id.toString()) || [];
    res.json({ pinnedCourses: pinned });
  } catch (err) {
    console.error(err);
    res.status(500).json({ pinnedCourses: [] });
  }
};

