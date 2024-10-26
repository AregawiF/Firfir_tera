import { Recipe } from '../../types/Recipe';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="recipe-card max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 m-5 w-96"> 
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
      <div className="p-6 "> 
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name}</h2> 
        <p className="text-gray-600 mb-4">
          Cook Time: <span className="font-semibold">{recipe.cookTime} mins</span> | Serves: <span className="font-semibold">{recipe.serves}</span> | Fasting: <span className="font-semibold">{recipe.fasting ? 'Yes' : 'No'}</span>
        </p>
        <p className="text-gray-600">Type: <span className="font-semibold">{recipe.type}</span></p>
      </div>
    </div>
  );
};

export default RecipeCard;
