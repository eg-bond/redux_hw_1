import { apiSliceContacts } from './api';
import { contactsSlice } from './slice';

export const contactsReducer = contactsSlice.reducer;

export const { useGetContactsQuery } = apiSliceContacts;

export const { addContact, removeContact } = contactsSlice.actions;
