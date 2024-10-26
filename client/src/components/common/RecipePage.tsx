import React from 'react'

const RecipePage = () => {
  return (
    <div className="recipe-card p-5 bg-gray-300 py-2 px-10">
      <h2 className="text-2xl font-bold ml-7 my-2">Chicken Skewers</h2>
      <img src="/Images/chicken-peppers.jpg" alt="Recipe" className="recipe-card__image w-10/12 mx-auto mb-3" />
      <div className="recipe-card__content">
        <p className="recipe-card__description">Chicken skewers are a classic, versatile dish perfect for grilling or baking. Marinated in a blend of spices, lemon, and olive oil, these skewers come out juicy, tender, and full of flavor. Serve with a side of vegetables, rice, or flatbread for a complete meal. Ideal for summer BBQs, family gatherings, or a weeknight dinner.

</p>
        <p className="recipe-card__details">
          Cook Time: 30 mins | Serves: 4 | Fasting: Yes | Type: BreakFast
        </p>
        <h3 className='font-bold text-xl mt-6 mb-3'>Ingredients</h3>
        <ul className="recipe-card__ingredients">
          <li className='list-disc ml-12'>
            Chicken Breasts: 1 lb (about 2 large breasts), cut into 1-inch cubes
          </li>
          <li className='list-disc ml-12'>
            Olive Oil: 2 tablespoons
          </li>
          <li className='list-disc ml-12'>
            Lemon Juice: 2 tablespoons (freshly squeezed)
          </li>
          <li className='list-disc ml-12'>
            Garlic: 2 cloves, minced
          </li>
          <li className='list-disc ml-12'>

          Paprika: 1 teaspoon
          </li>
          <li className='list-disc ml-12'>
            
          Ground Cumin: 1 teaspoon
          </li>
          <li className='list-disc ml-12'>

          Salt: 1 teaspoon
          </li>
        </ul>
        <h3 className='font-bold text-xl mt-6 mb-3'>Steps</h3>
        <ol className="">
          <li className='list-decimal ml-12'>
            
          Prepare the Marinade:
          </li>
          <li>


          In a large bowl, mix together the olive oil, lemon juice, minced garlic, paprika, cumin, salt, black pepper, and oregano.
          Marinate the Chicken:
          </li>
          <li>


          Add the chicken pieces to the marinade, tossing to coat all sides. Cover the bowl and refrigerate for at least 30 minutes (or up to 2 hours for deeper flavor).
          Assemble the Skewers:
          </li>
          <li>

          Preheat your grill or oven to medium-high heat (about 400°F/200°C).
          Thread the marinated chicken, bell pepper pieces, and red onion onto the skewers, alternating them for a colorful presentation.
          Cook the Skewers:
          </li>
          <li>

          Grill: Place the skewers on the grill and cook for 10-12 minutes, turning occasionally, until the chicken is fully cooked and has grill marks.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default RecipePage