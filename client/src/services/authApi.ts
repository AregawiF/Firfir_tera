import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    // baseUrl: 'https://firfir-tera-1b8qbtyan-aregawis-projects.vercel.app' 
    baseUrl: 'https://firfir-tera-lj2sz63vc-aregawis-projects.vercel.app' 
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
    // logout: builder.mutation({
    //   query: () => ({
    //     url: '/auth/logout',
    //     method: 'POST',
    //   }),
    // }),
  }),
});

export const { useSignupMutation, useLoginMutation  } = authApi;
export default authApi;