import React from 'react'
// import { useGetRecipesQuery } from '../../services/recipesApi';
import RecipeCard from '../common/RecipeCard';

const Home = () => {
    let recipes = []
  return (
    <div className='flex'>  
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
    </div>
  )
}

export default Home