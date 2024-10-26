import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Headers, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { multerConfig } from 'src/Upload/multer.config';
import { UploadService } from 'src/Upload/upload.service';
import { Category, Recipe } from 'src/schemas/recipe.schema';
import { createRecipeDto, updateRecipeDto } from 'src/dto/recipe.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Role } from 'src/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';
import storage from '../../multer-cloudinary.storage'; 
import { multerConfig } from 'src/Upload/multer.config';

@Controller('recipes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RecipeController {
  constructor(private recipeService: RecipeService, private readonly uploadService: UploadService) { }

  @Get()
  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeService.showAll()
  }

  @Post('new')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @Roles(Role.COOK)
  async createRecipe(
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("cookTime") cookTime: number,
    @Body("people") people: number,
    @Body("ingredients") ingredients: string[],
    @Body("steps") steps: string[],
    @Body("fasting") fasting: boolean,
    @Body("type") type: Category,
    @UploadedFile() file: Express.Multer.File,
    @Headers("Authorization") authorization: string): Promise<Recipe> {
    // this.uploadService.uploadFile(file)
    // console.log("the file is", name,description,cookTime,people,ingredients,steps,fasting,type,file.path)
    //  const imageUrl = file.path; // This should give you the URL of the uploaded image in Cloudinary
    const uploadResult = await this.uploadService.uploadFile(file); 
    const imageUrl = uploadResult.url;

    console.log("The file URL is", imageUrl);

    const createdRecipe = await this.recipeService.insertRecipe({ name, description, cookTime, people, ingredients, steps, fasting, type, image: imageUrl, cook_id: "1" }, authorization);
    return createdRecipe;
  }

  @Get('query')
  async search(@Query() query: ExpressQuery): Promise<Recipe[]> {
    return this.recipeService.find(query)
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    console.log(prodId)
    return await this.recipeService.getSingleRecipe(prodId);
  }

  @Get('myrecipes/:cookId')
  @Roles(Role.COOK)
  async getRecipesByCookId(@Param('cookId') cookId: string): Promise<Recipe[]> {
    console.log(cookId)
    return this.recipeService.getRecipesByCookId(cookId);
  }

  @Get(':title')
  async searchRecipe(
    @Param('title') title: string,
  ): Promise<Recipe[]> {
    return this.recipeService.searchByTitle(title);
  }

  @Get('category/:fasting')
  async getFasting(@Param('fasting') fasting) {
    if (fasting === "true" || fasting === "false") {
      return await this.recipeService.getFasting(fasting)
    }
    else {
      return await this.recipeService.getByType(fasting)
    }
  }

  // @Patch(':id')
  // @Roles(Role.COOK)
  
  // async updateRecipe(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   recipe: updateRecipeDto
  // ): Promise<Recipe> {
  //   console.log("the id is-",id)
  //   return this.recipeService.updateById(id, recipe)
  // }


  // @Patch(':id')
  // @Roles(Role.COOK)
  //       async updateProduct(
  //           @Param('id') recipeId: string,
  //           @Body('name') recipeName : string,
  //           @Body('description') recipeDesc : string,
  //           @Body('cookTime') cooktime: number,
  //           @Body('people') people: number,
  //           @Body('steps')  steps: string[],
  //           @Body('ingredients') ings: string[],
  //           @Body('fasting') fasting : boolean,
  //           @Body('type') type: string,
  //           @Body('image') image: string
            
  //       ){ 
  //           console.log("the Id is:", recipeId)
  //           return await this.recipeService.updateRecipe(
  //               recipeId,
  //               recipeName,
  //               recipeDesc,
  //               cooktime,
  //               people,
  //               steps,
  //               ings,
  //               fasting,
  //               type,
  //               image
                
  //            );
  //       }


  // @Patch(':id')
  // @Roles(Role.COOK)
  // async updateRecipe(
  //   @Param('id') id: string,
  //   @Body() updateData: updateRecipeDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<Recipe> {
  //   if (file) {
  //     const uploadResult = await this.uploadService.uploadFile(file);
  //     updateData.image = uploadResult.url;
  //   }
  //   return this.recipeService.updateById(id, updateData);
  // }



  @Delete(':id')
  @Roles(Role.COOK)
  async deleteRecipe(
    @Param('id')
    id: string,
  ): Promise<Recipe> {
    return this.recipeService.deleteById(id)
  }
}
