import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FavoriteDto } from "src/dto/favorite.dto";
import { Favorites } from "src/schemas/favorites.schema";
import { Recipe } from "src/schemas/recipe.schema";


@Injectable()
export class FavoritesService{
    constructor(
        @InjectModel(Favorites.name) 
        private favoriteModel: Model<Favorites>,
        @InjectModel(Recipe.name)
        private recipeModel: Model<Recipe>,
    ) {}

    async getAllFavorites(userId: string): Promise<Recipe[]> {
        const favoriteEntries = await this.favoriteModel.find({ user_id: userId }).exec();
        const favoriteRecipeIds = favoriteEntries.map(entry => entry.recipe_id.toString());
        const favoriteRecipes = await this.recipeModel.find({ _id: { $in: favoriteRecipeIds } }).exec();
        
        return favoriteRecipes;
    }

    async getAllFavoritesIds(userId: string): Promise<string[]> {
        const favoriteEntries = await this.favoriteModel.find({ user_id: userId }).exec();
        const favoriteRecipeIds = favoriteEntries.map(entry => entry.recipe_id.toString());
        return favoriteRecipeIds;
    }


    async createFavorite(favorite: FavoriteDto): Promise<Favorites> {
        const newFavorite = await this.favoriteModel.create(favorite);
        return newFavorite;
    }

    async removeFavorite(favorite: FavoriteDto): Promise<Favorites> {
        const deletedFavorite = await this.favoriteModel.findOneAndDelete({ recipe_id: favorite.recipe_id, user_id: favorite.user_id });
        return deletedFavorite;
    }
}