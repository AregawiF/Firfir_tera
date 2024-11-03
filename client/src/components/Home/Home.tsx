import RecipeCard from '../common/RecipeCard';
import { useGetRecipesQuery } from '../../services/recipesApi';
import { Recipe } from '../../types/Recipe';
import { Link } from 'react-router-dom';
import { useGetFavoritesIdsQuery } from '../../services/favoritesApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFavorites } from '../../store/favoritesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { data: recipes = [], error, isLoading} = useGetRecipesQuery({});
  const { data: favoriteIds = [], refetch: refetchFavorites } = useGetFavoritesIdsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetchFavorites();
  }, []);

  useEffect(() => {
    if (favoriteIds.length) {
      dispatch(setFavorites(favoriteIds));
    }
  }, [favoriteIds, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error fetching recipes: ${error.status}` : 'Error fetching recipes';
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="flex flex-wrap mx-10 my-7  ">
      {recipes.length === 0 ? (
        <div className="text-center w-full text-gray-600 text-3xl font-semibold card-container">
          No recipes available !
        </div>
      ) : (
        recipes.map((recipe: Recipe) => {
          const isFav = favoriteIds.includes(recipe._id);
          return(
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <RecipeCard key={recipe._id} recipe={recipe} isFav={isFav}/>
          </Link>
          );
        })
      )}
    </div>
  );
};


export default Home