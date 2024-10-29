// import { Injectable } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// // import { CloudinaryConfigService } from './cloudinary.config';

// @Injectable()
// export class CloudinaryService {
//   constructor() {
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
//   }

//   async uploadImage(filePath: string, folder: string) {
//     try {
//       const result = await cloudinary.uploader.upload(filePath, { folder });
//       return result.secure_url;
//     } catch (error) {
//       console.error('Cloudinary upload error:', error);
//       throw new Error('Failed to upload image');
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(buffer: Buffer, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image'));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      
      // Convert buffer to a readable stream and pipe it to Cloudinary
      Readable.from(buffer).pipe(stream);
    });
  }
}
