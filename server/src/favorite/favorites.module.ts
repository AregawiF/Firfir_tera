import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FavoritesSchema } from "src/schemas/favorites.schema";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Favorite', schema: FavoritesSchema }])],
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesModule],
})

export class FavoritesModule {}