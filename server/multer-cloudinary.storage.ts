import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2
import './cloudinary.config'; // Ensure your Cloudinary config is loaded

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
  },
});

export default storage;

