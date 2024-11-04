import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://firfir-tera-app-api.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => '/recipes',
    }),
    createRecipe: builder.mutation({
      query: (formData) => ({
        url: '/recipes/new',
        method: 'POST',
        body: formData,
      }),
    }),
    getSingleRecipe: builder.query({
      query: (id: string) => `/recipes/${id}`,
    }),
    getMyDishes: builder.query({
      query: () => '/recipes/myrecipes',
    }),
    
  }),
});

export const { useGetRecipesQuery, useCreateRecipeMutation, useGetSingleRecipeQuery, useGetMyDishesQuery } = recipesApi;
