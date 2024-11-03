import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavoritesSchema, Favorites } from "src/schemas/favorites.schema";
import { RecipeSchema, Recipe } from "src/schemas/recipe.schema";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Favorites', schema: FavoritesSchema },
            { name: 'Recipe', schema: RecipeSchema },]), 
                JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<string | number>('JWT_EXPIRES'),
                },
                };
            },
            })
        ],
    
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesModule],
})

export class FavoritesModule {}