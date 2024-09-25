import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [] as string[];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addContactToFavorite(state, action: PayloadAction<{ id: string }>) {
      if (!state.includes(action.payload.id)) {
        state.push(action.payload.id);
      }
    },
    removeContactFromFavorite(state, action: PayloadAction<{ id: string }>) {
      return state.filter(id => id !== action.payload.id);
    },
  },
});
