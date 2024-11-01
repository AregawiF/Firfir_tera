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

  @Post()
  async createFav(@Body() createFavoriteDto: FavoriteDto) {
    return this.favoritesService.createFavorite(createFavoriteDto);
  }

  @Delete(':id')
  async removeFav(@Param('id') favId: string) {
    return await this.favoritesService.removeFavorite(favId);
  }
}