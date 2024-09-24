import { contactsSlice } from './slice';
export * from './thunks';

export const contactReducer = contactsSlice.reducer;

export const {
  removeContact,
  removeGroup,
  addContactToFavorite,
  removeContactFromFavorite,
} = contactsSlice.actions;
