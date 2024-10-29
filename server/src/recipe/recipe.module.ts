import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from 'src/schemas/recipe.schema';
import { CloudinaryModule } from 'src/Upload/cloudinart.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]), CloudinaryModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports:[RecipeService]
})
export class RecipeModule { }
