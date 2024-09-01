import multer from "multer";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
