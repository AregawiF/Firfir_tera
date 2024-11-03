import { Recipe } from '../../types/Recipe';
import {useState} from 'react';
import Notification from './Notification';
import { useAddFavoriteMutation, useRemoveFavoriteMutation } from '../../services/favoritesApi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';


const RecipeCard = ({ recipe, isFav: initialIsFav }: { recipe: Recipe, isFav: boolean }) => {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(initialIsFav);
    const [notification, setNotification] = useState('');
    const [createFav] = useAddFavoriteMutation();
    const [removeFav] = useRemoveFavoriteMutation();


    const handleFavClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        if (isFav) {
          await removeFav(recipe._id).unwrap();
          dispatch(removeFavorite(recipe._id.toString()));
          setNotification('Removed from favorites');
        } else {
          await createFav({ recipe_id: recipe._id }).unwrap();
          dispatch(addFavorite(recipe._id.toString()));
          setNotification('Added to favorites');
        }
        setIsFav(!isFav);
      } catch (error) {
          console.error('Failed to update favorite:', error); 
          setNotification('Failed to update favorites'); 
      }
    };

    const handleCloseNotification = () => {
        setNotification('');
    };

  return (
    <div className="recipe-card max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 m-5 w-96"> 
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
      <div className="p-6 "> 
        <div className='flex justify-between'>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}</h2> 
          <img src={`${isFav ? '/icons/favorite_filled.svg' : '/icons/favorite.svg'}`} alt="" className='w-7' onClick={handleFavClick}/>
        </div>
        <p className="text-gray-600 mb-4">
          ⏱️Cook Time: <span className="font-semibold">{recipe.cookTime} mins</span> | 👥 Serves: <span className="font-semibold">{recipe.people}</span> <br />🌱Fasting: <span className="font-semibold">{recipe.fasting ? 'Yes' : 'No'}</span> | 🍽️ Type: <span className="font-semibold">{recipe.mealType}</span> 
          {/* 🧑‍🍳 Cook:
          <span className="font-semibold">{recipe.cook_name}</span> */}
        </p>
        {notification && (
                    <Notification message={notification} onClose={handleCloseNotification} />
                )}
      </div>
    </div>
  );
};

export default RecipeCard;
