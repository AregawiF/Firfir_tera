// import { diskStorage } from 'multer';

// export const multerConfig = {
//   storage: diskStorage({
//     destination: '/home/anatoli/Web Dev Course/webv3/firfir_tera-auth-and-feature/uploads',
//     filename: (req, file, callback) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const extension = file.originalname.split('.').pop();
//       callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
//     },
//   }),
// };


import { MulterModuleOptions } from '@nestjs/platform-express';
import storage from './multer-cloudinary.storage';

export const multerConfig: MulterModuleOptions = {
  storage, // Use your custom storage
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png']; // Allowed file types
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
    }
  },
  limits: {
    fileSize: 15 * 1024 * 1024 // 5MB file size limit 
  }
};