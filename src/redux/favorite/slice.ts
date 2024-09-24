import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [] as string[];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addContactToFavorite(state, action: PayloadAction<{ id: string }>) {
      if (state.includes(action.payload.id)) return state;
      state.push(action.payload.id);
      return state;
    },
    removeContactFromFavorite(state, action: PayloadAction<{ id: string }>) {
      const filteredFavorites = state.filter(id => id !== action.payload.id);
      return filteredFavorites;
    },
  },
});
