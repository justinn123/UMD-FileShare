import express from "express";
import {pinCourse, unpinCourse, getPinnedCourses} from "../controllers/userController.js";

const router = express.Router();

router.post("/pinnedCourses/:courseId", pinCourse);
router.delete("/pinnedCourses/:courseId", unpinCourse);
router.get("/pinnedCourses", getPinnedCourses);

export default router;