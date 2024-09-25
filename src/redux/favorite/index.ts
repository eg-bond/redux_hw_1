import { favoriteSlice } from './slice';

export const favoriteReducer = favoriteSlice.reducer;

export const { addContactToFavorite, removeContactFromFavorite } =
  favoriteSlice.actions;
