import express from "express";
import { getCourses, getCourseByName, getCoursesByIds, uploadCourseFile } from "../controllers/courseController.js";

const router = express.Router();

// List/search courses
router.get("/", getCourses);

// Get single course by name
router.get("/:name", getCourseByName);

//Get courses by ids
router.post("/byIds", getCoursesByIds);

// Upload file to a course
router.post("/:name/upload", uploadCourseFile);

export default router;
