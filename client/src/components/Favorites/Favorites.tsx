import { Link } from "react-router-dom";
import { useGetFavoritesQuery } from "../../services/favoritesApi";
import RecipeCard from "../common/RecipeCard";
import { Recipe } from "../../types/Recipe";
import { useEffect } from "react";

const Favorites = () => {
  const { data: favorites = [], isLoading, isError, error, refetch: refetchFavorites } = useGetFavoritesQuery({});

  useEffect(() => {
    refetchFavorites();
  }, []);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = 'status' in error ? `Error fetching favorites: ${error.status}` : 'Error fetching favorites';
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="flex flex-wrap mx-10 my-7">
      {favorites.length === 0 ? (
        <div className="text-center w-full text-gray-600 text-3xl font-semibold card-container">
          You have no favorite recipes yet !
        </div>
      ) : (
        favorites.map((favorite: Recipe) => (
          <Link to={`/recipe/${favorite._id}`} key={favorite._id}>
            <RecipeCard key={favorite._id} recipe={favorite} isFav={true} />
          </Link>
        ))
      )}

    </div>
  );
};

export default Favorites