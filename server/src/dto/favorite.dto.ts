import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteDto {
  @IsString()
  @IsNotEmpty()
  recipe_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}