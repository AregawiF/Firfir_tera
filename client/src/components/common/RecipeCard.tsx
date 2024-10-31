import { Recipe } from '../../types/Recipe';
import {useState} from 'react';
import Notification from './Notification';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [isFav, setIsFav] = useState(false);
    const [notification, setNotification] = useState('');
    const handleFavClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFav(!isFav);
      setNotification(isFav ? 'Removed from favorites' : 'Added to favorites');
      console.log('Fav clicked');
    };

    const handleCloseNotification = () => {
        setNotification('');
    };

  return (
    <div className="recipe-card max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 m-5 w-96"> 
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover" />
      <div className="p-6 "> 
        <div className='flex justify-between'>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name}</h2> 
          <img src={`${isFav ? '/icons/favorite_filled.svg' : '/icons/favorite.svg'}`} alt="" className='w-7' onClick={handleFavClick}/>
        </div>
        <p className="text-gray-600 mb-4">
          ⏱️Cook Time: <span className="font-semibold">{recipe.cookTime} mins</span> | 👥 Serves: <span className="font-semibold">{recipe.people}</span> <br />🌱Fasting: <span className="font-semibold">{recipe.fasting ? 'Yes' : 'No'}</span> | 🍽️ Type: <span className="font-semibold">{recipe.mealType}</span>
        </p>
        {notification && (
                    <Notification message={notification} onClose={handleCloseNotification} />
                )}
      </div>
    </div>
  );
};

export default RecipeCard;
