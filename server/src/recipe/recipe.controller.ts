import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Headers, UseGuards, UploadedFile, UseInterceptors, UnauthorizedException, Request } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Recipe } from 'src/schemas/recipe.schema';
import { createRecipeDto, updateRecipeDto } from 'src/dto/recipe.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Role } from 'src/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from 'src/Upload/cloudinary.service';
import { JwtService } from '@nestjs/jwt';


@Controller('recipes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RecipeController {
  constructor(private recipeService: RecipeService, private cloudinaryService: CloudinaryService, private jwtService: JwtService,) { }
  @Get()
  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeService.showAll()
  }

  @Post('new')
  @UseInterceptors(FileInterceptor('image'))
  @Roles(Role.COOK)
  async createRecipe(
    @Body() newRecipeData: createRecipeDto,
    @UploadedFile() image: Express.Multer.File,
    @Headers("Authorization") authorization: string): Promise<Recipe> {

      if (!image) {
        throw new Error('Image file is required');
      }
      const imageUrl = await this.cloudinaryService.uploadImage(image.buffer, 'recipes');
      const recipeData = {
        ...newRecipeData,
        ingredients: newRecipeData.ingredients,
        steps: newRecipeData.steps,
        image: imageUrl,
        cook_id: "1"
      };
      return this.recipeService.insertRecipe(recipeData, authorization);
  }

  @Get('query')
  async search(@Query() query: ExpressQuery): Promise<Recipe[]> {
    return this.recipeService.find(query)
  }

  @Get('/myrecipes')
  @Roles(Role.COOK)
  async getRecipesOfCook(@Request() req): Promise<Recipe[]> {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    
    const decoded = this.jwtService.verify(token); 
    const cookId = decoded.id; 
    return this.recipeService.getRecipesByCookId(cookId);
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.recipeService.getSingleRecipe(prodId);
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
  
  @Delete(':id')
  @Roles(Role.COOK)
  async deleteRecipe(
    @Param('id')
    id: string,
  ): Promise<Recipe> {
    return this.recipeService.deleteById(id)
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



}
