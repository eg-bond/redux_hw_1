import { GroupDto } from 'src/types/dto/GroupDto';
import { ContactDto } from 'src/types/dto/ContactDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchContacts, fetchGroups } from './thunks';
import { generateUUID } from 'src/helpers/generateUUID';

const initialState = {
  contacts: [] as ContactDto[],
  favorite: [] as string[],
  groups: [] as GroupDto[],
};

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
      state.contacts.push(newContact);
    },
    removeContact(state, action: PayloadAction<{ id: string }>) {
      const filteredContacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      const filteredGroupContacts = state.groups.map(group => {
        if (group.contactIds.includes(action.payload.id)) {
          group.contactIds = group.contactIds.filter(
            id => id !== action.payload.id
          );
        }
        return group;
      });

      state.contacts = filteredContacts;
      state.groups = filteredGroupContacts;
    },
    addGroup(
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) {
      const newGroup = {
        id: generateUUID(),
        name: action.payload.name,
        description: action.payload.description,
        photo: '/images/id-164-200-300.jpg',
        contactIds: [],
      };
      state.groups.push(newGroup);
    },
    removeGroup(state, action: PayloadAction<{ id: string }>) {
      const filteredGroups = state.groups.filter(
        group => group.id !== action.payload.id
      );
      state.groups = filteredGroups;
    },
    addContactToGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const neededGroupIndex = state.groups.findIndex(
        group => group.id === action.payload.groupId
      );
      const groupContacts = state.groups[neededGroupIndex].contactIds;
      // if contact is already in group:
      if (groupContacts.includes(action.payload.contactId)) return state;
      // if not:
      groupContacts.push(action.payload.contactId);
    },
    removeContactFromGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const neededGroupIndex = state.groups.findIndex(
        group => group.id === action.payload.groupId
      );
      const filteredGroupContacts = state.groups[
        neededGroupIndex
      ].contactIds.filter(id => id !== action.payload.contactId);

      state.groups[neededGroupIndex].contactIds = filteredGroupContacts;
    },

    addContactToFavorite(state, action: PayloadAction<{ id: string }>) {
      if (state.favorite.includes(action.payload.id)) return state;
      state.favorite.push(action.payload.id);
    },
    removeContactFromFavorite(state, action: PayloadAction<string>) {
      const filteredFavorites = state.favorite.filter(
        id => id !== action.payload
      );
      state.favorite = filteredFavorites;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(fetchContacts.fulfilled.match, (state, action) => {
      state.contacts = action.payload.contacts;
    });
    builder.addMatcher(fetchContacts.rejected.match, (state, action) => {
      console.log(action.error.message);
      state.contacts = initialState.contacts;
    });

    builder.addMatcher(fetchGroups.fulfilled.match, (state, action) => {
      state.groups = action.payload.groups;
    });
    builder.addMatcher(fetchGroups.rejected.match, (state, action) => {
      console.log(action.error.message);
      state.groups = initialState.groups;
    });
  },
});
