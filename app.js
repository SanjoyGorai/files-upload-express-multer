import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import { removeFile } from "./utils/fileUtils.js";
import { cleanupDirectory } from "./utils/cleanupDirectory.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// removeFile("uploads");
cleanupDirectory("./uploads");

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost${PORT}`);
});
