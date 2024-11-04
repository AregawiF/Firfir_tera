import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => `/user`,
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: `/user`,
        method: 'DELETE',
      }),

    }),
    updateAccount: builder.mutation({
      query: (userData) => ({
      url: `/user`,
      method: 'PATCH',
      body: userData,
      }),
    }),

  }),
});

export const { useGetAccountQuery, useUpdateAccountMutation, useDeleteAccountMutation  } = usersApi;
