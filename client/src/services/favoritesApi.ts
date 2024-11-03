import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://firfir-tera-1b8qbtyan-aregawis-projects.vercel.app',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getFavorites: builder.query({
            query: () => '/favorites',
        }),
        getFavoritesIds: builder.query({
            query: () => '/favorites/ids'
        }),
        addFavorite: builder.mutation({
            query: (recipeId) => ({
                url: '/favorites',
                method: 'POST',
                body: recipeId,
            }),
        }),
        removeFavorite: builder.mutation({
            query: (id) => ({
                url: `/favorites/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation, useGetFavoritesIdsQuery } = favoritesApi;