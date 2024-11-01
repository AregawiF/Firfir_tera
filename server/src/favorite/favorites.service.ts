import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

        // if (!favoriteEntries.length) {
        //     throw new NotFoundException('No favorite recipes found for this user');
        // }

        const favoriteRecipeIds = favoriteEntries.map(entry => entry.recipe_id.toString());

        const favoriteRecipes = await this.recipeModel.find({ _id: { $in: favoriteRecipeIds } }).exec();
        

        return favoriteRecipes;
    }

    async createFavorite(favorite: Favorites): Promise<Favorites> {
        const newFavorite = this.favoriteModel.create(favorite);
        return newFavorite;
    }

    async removeFavorite(id: string): Promise<Favorites> {
        const deletedFavorite = this.favoriteModel.findByIdAndDelete(id);
        return deletedFavorite;
    }
}