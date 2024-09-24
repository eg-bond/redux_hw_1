import { apiSlice } from './api';
import { contactsSlice } from './slice';

export const contactReducer = contactsSlice.reducer;

export const { useGetContactsQuery, useGetGroupsQuery } = apiSlice;

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
