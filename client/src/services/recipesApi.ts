import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store'; // Adjust the path as necessary
import { useSelector } from 'react-redux';

// i want to add an additional endpoint for creating a recipe
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
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
  }),
});

export const { useGetRecipesQuery, useCreateRecipeMutation } = recipesApi;
