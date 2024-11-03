import RecipeCard from '../common/RecipeCard';
import { Recipe } from '../../types/Recipe';
import { Link } from 'react-router-dom';
import { useGetMyDishesQuery } from '../../services/recipesApi';
import { useGetFavoritesIdsQuery } from '../../services/favoritesApi';
import { useEffect } from 'react';

const Mydishes = () => {
  const { data: favoriteIds = [],refetch: refetchFavorites } = useGetFavoritesIdsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetchFavorites(); 
  } ,[]);
  
  const { data: recipes = [], error, isLoading } = useGetMyDishesQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error fetching recipes: ${error.status}` : 'Error fetching recipes';
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="flex flex-wrap mx-10 my-7 ">
      {recipes.length === 0 ? (
        <div className="text-center w-full text-gray-600 text-3xl font-semibold">
          You don't have any dishes yet. 😢
        </div>
      ) : (
        recipes.map((recipe: Recipe) => {
          const isFavorite = favoriteIds.includes(recipe._id);
          return (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <RecipeCard key={recipe._id} recipe={recipe} isFav={isFavorite}/>
          </Link>
          );
          })
      )}
    </div>
  );
};
            
        


export default Mydishes


  


