import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
// import { CloudinaryConfigService } from './cloudinary.config';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Export CloudinaryService to make it available in other modules
})
export class CloudinaryModule {}
