import React from 'react'

const RecipeCard = () => {
  return (
    <div className="recipe-card p-5 bg-gray-300 rounded-2xl w-4/12 m-5">
      <h2 className="text-2xl font-bold ml-7 my-2">Chicken Skewers</h2>
      <img src="/Images/chicken-peppers.jpg" alt="Recipe" className="recipe-card__image w- mx-auto mb-3" />
      <div className="recipe-card__content">
        <p className="recipe-card__description">Chicken skewers are a classic, versatile dish perfect for grilling or baking. Marinated in a blend of spices, lemon, and ...</p>
        <p className="recipe-card__details">
          Cook Time: 30 mins | Serves: 4 | Fasting: Yes | Type: BreakFast
        </p>
        <h3 className='font-bold text-xl'>Ingredients</h3>
        <ul className="recipe-card__ingredients">
          <li>

          Chicken Breasts: 1 lb (about 2 large breasts), cut into 1-inch cubes
          </li>
          <li>

          Olive Oil: 2 tablespoons
          </li>
          <li>

          Lemon Juice: 2 tablespoons (freshly squeezed)
          </li>
          
        </ul>
        <h3 className='font-bold text-xl'>Steps</h3>
        <ol className="recipe-card__steps">
          <li>
            
          Prepare the Marinade:
          </li>
          <li>


          In a large bowl, mix together the olive oil, lemon juice, minced garlic, paprika, cumin, salt, black pepper, and oregano.
          Marinate the Chicken:
          </li>
          
        </ol>
      </div>
    </div>
  )
}

export default RecipeCard