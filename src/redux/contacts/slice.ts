import { ContactDto } from 'src/types/dto/ContactDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUUID } from 'src/helpers/generateUUID';
import { apiSliceContacts } from './api';

const initialState = [] as ContactDto[];

type AddContactActionPayload = PayloadAction<{
  name: string;
  phone: string;
  birthday: string;
  address: string;
}>;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: AddContactActionPayload) {
      const newContact = {
        id: generateUUID(),
        name: action.payload.name,
        phone: action.payload.phone,
        birthday: action.payload.birthday,
        address: action.payload.address,
        photo: '/images/id-164-200-300.jpg',
      };
      state.push(newContact);
    },
    removeContact(state, action: PayloadAction<{ id: string }>) {
      return state.filter(contact => contact.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSliceContacts.endpoints.getContacts.matchFulfilled,
      (_, action) => (_ = action.payload)
    );
  },
});
