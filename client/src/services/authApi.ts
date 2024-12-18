import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://firfir-tera-app-api.onrender.com', 
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: `/auth/signup/${user.role}`,
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation  } = authApi;
export default authApi;