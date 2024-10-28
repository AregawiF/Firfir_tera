// // upload.service.ts
// import { Injectable, BadRequestException } from '@nestjs/common';
// import { multerConfig } from './multer.config';
// import { diskStorage } from 'multer';

// @Injectable()
// export class UploadService {
//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     if (!file) {
//       throw new BadRequestException('No file provided');
//     }

//     console.log('File path:', file.path);

//     return file.path;
//   }
// }


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    // Configure Cloudinary
    cloudinary.v2.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    if (!file || !file.buffer) {
      throw new Error('File buffer is not defined');
    }

    try {
      const uploadResponse = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(file.buffer);
      });

      return { url: uploadResponse.secure_url };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error; 
    }
    // try {
    //   const uploadResponse = await cloudinary.v2.uploader.upload(file.path, {
    //     // You can add optional Cloudinary upload options here, e.g.,
    //     // public_id: 'custom-filename', // Set a custom filename
    //     // folder: 'uploads/recipes' // Organize images into a folder
    //   });
    //   return { url: uploadResponse.secure_url };
    // } catch (error) {
    //   console.error('Cloudinary upload error:', error);
    //   throw error; 
    // }
  }
}