// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2
// import './cloudinary.config'; // Ensure your Cloudinary config is loaded

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//   },
// });

// export default storage;

// multer-cloudinary.storage.ts
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipe_images', // Folder name in your Cloudinary account
    allowed_formats: ['jpeg', 'png'],
  } as Record<string, string | string[]>,
});

export default storage;
