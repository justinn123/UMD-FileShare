import express from "express";
import { getCourses, getCourseByName } from "../controllers/courseController.js";

const router = express.Router();

// List/search courses
router.get("/", getCourses);

// Get single course by name
router.get("/:name", getCourseByName);

export default router;
