import express from "express";

import {
  getAllDoctor,
  getSingleDoctor,
  deleteDoctor,
  updateDoctor,
  getDoctorProfile,
} from "../Controller/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";
import userRouter from "./user.js";

const router = express.Router();

//nested route for reviews

router.use("/:doctorId/reviews", reviewRouter);
router.use("/doctors/:id", userRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
