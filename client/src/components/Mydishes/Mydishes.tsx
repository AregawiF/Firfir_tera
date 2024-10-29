import RecipeCard from '../common/RecipeCard';
import { useGetRecipesQuery } from '../../services/recipesApi';
import { Recipe } from '../../types/Recipe';
import { useParams } from 'react-router-dom';

const Mydishes = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipes = [], error, isLoading } = useGetRecipesQuery({});
  console.log(recipes);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error fetching recipes: ${error.status}` : 'Error fetching recipes';
    return <div>{errorMessage}</div>;
  }

  return (
      <div className="flex flex-wrap mx-10 my-7 justify-between">
        {recipes.length === 0 ? (
          <div className="text-center w-full text-gray-600 text-3xl font-semibold">
            You don't have any dishes yet 😢
          </div>
        ) : (
          recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>
    );
  };


export default Mydishes



