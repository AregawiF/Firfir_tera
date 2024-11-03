// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from '../services/recipesApi';
import { authApi } from '../services/authApi';
import authReducer from './authSlice';
import { usersApi } from '../services/usersApi';
import { favoritesApi } from '../services/favoritesApi';

export const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware, authApi.middleware, usersApi.middleware, favoritesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
