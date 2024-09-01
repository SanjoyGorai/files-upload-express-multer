import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the uploads directory
const uploadsDir = path.join(__dirname, "uploads");

// Function to delete all files and folders inside the directory
const cleanupDirectory = (dirPath) => {
  try {
    // Check if directory exists
    if (fs.existsSync(dirPath)) {
      // Remove all files and directories inside the directory
      fs.emptyDirSync(dirPath);
      console.log("Uploads folder cleaned up successfully.");
    } else {
      console.log("Directory does not exist.");
    }
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
};

export { cleanupDirectory };
