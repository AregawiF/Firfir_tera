import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema ({timestamps: true})
export class Favorites {
    @Prop()
    recipe_id: string;

    @Prop()
    user_id: string;
}

export type FavoritesDocument = Favorites & Document;
export const FavoritesSchema = SchemaFactory.createForClass(Favorites);