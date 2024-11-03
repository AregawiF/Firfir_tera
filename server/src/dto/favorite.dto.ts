import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteDto {
  @IsString()
  recipe_id: string;

  // @IsString()
  user_id: string;
}