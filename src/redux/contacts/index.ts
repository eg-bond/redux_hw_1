import { contactsSlice } from './slice';
export * from './thunks';

export const contactReducer = contactsSlice.reducer;

export const {
  addContact,
  removeContact,
  addGroup,
  removeGroup,
  addContactToFavorite,
  removeContactFromFavorite,
  addContactToGroup,
  removeContactFromGroup,
} = contactsSlice.actions;
