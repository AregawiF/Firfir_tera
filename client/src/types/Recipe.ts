export interface Recipe {
  _id: number;
  name: string;
  description: string;
  cookTime: string;
  serves: string;
  ingredients: string[];
  steps: string[];
  fasting: boolean;
  type: string;
  image: string;
  cookId: string
}