import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import express from 'express';

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'recipes' },
      (error, result) => {
        if (error) {
          res.status(500).json({ error: 'Image upload failed' });
        } else {
          res.json({ imageUrl: result.secure_url });
        }
      }
    );

    if (req.file) {
      // Pipe the file stream to the Cloudinary upload stream
      req.file.stream.pipe(uploadStream);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export { upload };
export default app;
