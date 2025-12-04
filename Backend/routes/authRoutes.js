import express from "express";
import {signup, login} from "../controllers/authController.js";
import { requireAuth, refreshToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/verify", requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email
    }
  });
});
router.post("/refresh", refreshToken);

router.post("/signup", signup);
router.post("/login", login);

export default router;