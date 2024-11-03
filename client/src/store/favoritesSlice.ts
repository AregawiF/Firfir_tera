import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteRecipes: string[]; // Array of recipe IDs that are favorites
}

const initialState: FavoritesState = {
  favoriteRecipes: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteRecipes = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteRecipes.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(id => id !== action.payload);
    },
    resetFavorites: (state) => {
      state.favoriteRecipes = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

