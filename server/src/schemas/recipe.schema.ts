import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  cookTime: number;

  @Prop()
  people: number;

  @Prop([String])
  ingredients: string[];

  @Prop([String])
  steps: string[];

  @Prop()
  fasting: boolean;

  @Prop()
  mealType: string;

  @Prop()
  image: string;

  @Prop()
  cook_id: string;

  @Prop()
  cook_name: string;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);