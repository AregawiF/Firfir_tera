import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
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
        addFavorite: builder.mutation({
            query: (favorite) => ({
                url: '/favorites',
                method: 'POST',
                body: favorite,
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

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoritesApi;