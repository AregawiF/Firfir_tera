import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class createRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString() 
  @IsNotEmpty()   
  description: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  cookTime: number;

  @Transform(({ value }) => parseInt(value)) 
  @IsNumber()
  @IsNotEmpty()
  people: number;

  @Transform(({ value }) => JSON.parse(value)) 
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) 
  ingredients: string[];

  @Transform(({ value }) => JSON.parse(value)) 
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  steps: string[];

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  fasting: boolean;

  @IsNotEmpty()
  mealType: string;

  @IsOptional()
  @IsString()
  cook_id: string;

  @IsOptional()
  @IsString()
  cook_name: string;

}
export class updateRecipeDto {
  @IsString()
  @IsOptional()
   name: string;

  @IsString() 
  @IsOptional()
   description: string;

  @IsNumber()
  @IsOptional()
  cookTime: number;

  @IsNumber()
  @IsOptional()
  people: number;

  @IsArray()
  @IsOptional()
  ingredients: string[];

  @IsArray()
  @IsOptional()
  steps: string[];

  @IsBoolean()
  @IsOptional()
  fasting: boolean;

  @IsOptional()
  // @IsEnum(Category, { message: 'Please enter the appropriate category!!' })
  mealType: string;

  // @IsString()
  // @IsOptional()
  // image: File;

  @IsString()
  @IsOptional()
  cook_id: string;

  @IsString()
  @IsOptional()
  cook_name: string;
}

