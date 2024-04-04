import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { Response } from 'express-serve-static-core';
import "dotenv/config"
import fs from "fs"

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
 fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, uploadsDir);
 },
 filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
 },
});

const upload = multer({
 storage,
 fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      throw Error("File type is not supported")
      return;
    }
    cb(null, true);
 },
});

export const handleImageUpload = async (req: any, res: Response) => {
 upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Image upload failed' });
    }

    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    try {
      const result = await cloudinary.uploader.upload(uploadedFile.path);
      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
 });
};
