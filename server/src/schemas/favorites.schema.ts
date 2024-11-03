import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Favorites extends Document {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    recipe_id: string;
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);