import { ContactDto } from 'src/types/dto/ContactDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUUID } from 'src/helpers/generateUUID';
import { apiSliceContacts } from './api';

const initialState = [] as ContactDto[];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(
      state,
      action: PayloadAction<{
        name: string;
        phone: string;
        birthday: string;
        address: string;
      }>
    ) {
      const newContact = {
        id: generateUUID(),
        name: action.payload.name,
        phone: action.payload.phone,
        birthday: action.payload.birthday,
        address: action.payload.address,
        photo: '/images/id-164-200-300.jpg',
      };
      state.push(newContact);
      return state;
    },
    removeContact(state, action: PayloadAction<{ id: string }>) {
      const filteredContacts = state.filter(
        contact => contact.id !== action.payload.id
      );

      return filteredContacts;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSliceContacts.endpoints.getContacts.matchFulfilled,
      (state, action) => (state = action.payload)
    );
  },
});
