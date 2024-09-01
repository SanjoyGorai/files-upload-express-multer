import fs from "fs-extra";

export const removeFile = async (filePath) => {
  try {
    await fs.remove(filePath);
  } catch (err) {
    console.error(`Error removing file: ${err}`);
  }
};
