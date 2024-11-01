export interface Recipe {
  _id: number;
  name: string;
  description: string;
  cookTime: string;
  people: string;
  ingredients: string[];
  steps: string[];
  fasting: boolean;
  mealType: string;
  image: string;
  cookId: string;
  cook_name: string;
}