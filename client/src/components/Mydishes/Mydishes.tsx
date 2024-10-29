import RecipeCard from '../common/RecipeCard';
import { Recipe } from '../../types/Recipe';
import { Link } from 'react-router-dom';
import { useGetMyDishesQuery } from '../../services/recipesApi';

const Mydishes = () => {
  const { data: recipes = [], error, isLoading } = useGetMyDishesQuery({});
  console.log('sdfs df',recipes);
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error fetching recipes: ${error.status}` : 'Error fetching recipes';
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="flex flex-wrap mx-10 my-7 justify-between">
      {recipes.length === 0 ? (
        <div className="text-center w-full text-gray-600 text-3xl font-semibold">
          You don't have any dishes yet. 😢
        </div>
      ) : (
        recipes.map((recipe: Recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <RecipeCard key={recipe._id} recipe={recipe} />
          </Link>
        ))
      )}
    </div>
  );
};
            
        


export default Mydishes


  


