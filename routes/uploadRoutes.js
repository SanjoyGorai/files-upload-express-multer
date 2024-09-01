import express from "express";
import upload from "../middlewares/multerConfig.js";
import {
  uploadSingleImage,
  uploadMultipleImages,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/single", upload.single("file"), uploadSingleImage);
router.post("/multiple", upload.array("files", 10), uploadMultipleImages);

export default router;
