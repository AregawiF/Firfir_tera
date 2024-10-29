import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleRecipeQuery } from '../../services/recipesApi';
import { Recipe } from '../../types/Recipe';

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, error, isLoading } = useGetSingleRecipeQuery(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;

  if (!recipe) return <div>No recipe found</div>;

  const ingredients = JSON.parse(recipe.ingredients[0]);
  const steps = JSON.parse(recipe.steps[0]);

  return (
    <div className="recipe-page mx-auto max-w-3xl p-5 md:p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
      />
      <div className="mb-6">
        <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
        <div className="gap-4 text-gray-700 font-medium">
          <p>⏱️ Cook Time: {recipe.cookTime} mins</p>
          <p>👥 Serves: {recipe.people}</p>
          <p>🌱 Fasting: {recipe.fasting ? 'Yes' : 'No'}</p>
          <p>🍽️ Meal Type: {recipe.mealType}</p>
        </div>
      </div>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ingredients</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {recipe.ingredients.map((ingredient:string, index:number) => (
            <li key={index} className="my-1">
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Steps</h3>
        <ol className="list-decimal pl-5 text-gray-700">
          {recipe.steps.map((step:string, index:number) => (
            <li key={index} className="my-2">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default RecipePage;