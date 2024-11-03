import { Controller, Get, Post, Put, Delete, Param, Body, Request, UnauthorizedException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from 'src/schemas/favorites.schema';
import { FavoriteDto } from 'src/dto/favorite.dto';
import { Recipe } from 'src/schemas/recipe.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('favorites')
export class FavoritesController {
    constructor(private favoritesService: FavoritesService, private jwtService: JwtService) {}
  @Get()
  async findAll(@Request() req): Promise<Recipe[]> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const userId = this.jwtService.verify(token).id;

    return this.favoritesService.getAllFavorites(userId);
  }
  @Get('/ids')
  async findAllIds(@Request() req): Promise<string[]> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const userId = this.jwtService.verify(token).id;
    return this.favoritesService.getAllFavoritesIds(userId);
  }

  @Post()
  async createFav(@Request() req, @Body() favoriteDto: FavoriteDto): Promise<Favorites> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const userId = this.jwtService.verify(token).id;
    favoriteDto.user_id = userId;
    
    return this.favoritesService.createFavorite(favoriteDto);
  }

  @Delete(':id')
  async removeFav(@Request() req, @Param('id') favId: string) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const userId = this.jwtService.verify(token).id;
    const removeFav = new FavoriteDto();
    removeFav.recipe_id = favId;
    removeFav.user_id = userId;
    console.log(removeFav);
    return await this.favoritesService.removeFavorite(removeFav);
  }
}

