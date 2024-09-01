import cloudinary from "../utils/cloudinary.js";
import { removeFile } from "../utils/fileUtils.js";
import { v4 as uuidv4 } from "uuid";

const FOLDER_NAME = "SanImage"; // Folder name in Cloudinary

export const uploadSingleImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");

    // Generate a unique public ID
    const uniqueId = uuidv4();
    const publicId = `${FOLDER_NAME}/${uniqueId}`;
    console.log("Path:", file.path);

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: FOLDER_NAME,
      public_id: uniqueId,
    });
    const fileUrl = result.secure_url;

    // Remove file after 2 minutes
    setTimeout(() => removeFile(file.path), 4000);

    res.status(200).json({ url: fileUrl, public_id: result.public_id });
  } catch (error) {
    res.send("sssdf");
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        message:
          "File size exceeds the 10MB limit. Please upload a smaller file.",
      });
    }
    res.status(500).json({
      message: "An error occurred during file upload.",
      error: error.message,
    });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0)
      return res.status(400).send("No files uploaded.");

    const uploadPromises = files.map((file) => {
      const uniqueId = uuidv4();
      const publicId = `${FOLDER_NAME}/${uniqueId}`;

      return cloudinary.uploader
        .upload(file.path, {
          folder: FOLDER_NAME,
          public_id: uniqueId,
        })
        .then((result) => {
          setTimeout(() => removeFile(file.path), 4000);
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        });
    });

    const urls = await Promise.all(uploadPromises);
    res.status(200).json({ urls });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
