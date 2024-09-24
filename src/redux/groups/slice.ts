import { GroupDto } from 'src/types/dto/GroupDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUUID } from 'src/helpers/generateUUID';

import { DEFAULT_IMAGE } from 'src/constants/general';
import { apiSliceGroups } from './api';

const initialState = [] as GroupDto[];

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup(
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) {
      const newGroup = {
        id: generateUUID(),
        name: action.payload.name,
        description: action.payload.description,
        photo: DEFAULT_IMAGE,
        contactIds: [],
      };
      state.push(newGroup);
      return state;
    },
    removeGroup(state, action: PayloadAction<{ id: string }>) {
      const filteredGroups = state.filter(
        group => group.id !== action.payload.id
      );
      return filteredGroups;
    },
    addContactToGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const neededGroupIndex = state.findIndex(
        group => group.id === action.payload.groupId
      );
      const groupContacts = state[neededGroupIndex].contactIds;
      // if contact is already in group:
      if (groupContacts.includes(action.payload.contactId)) {
        return state;
      } else {
      }
      // if not:
      groupContacts.push(action.payload.contactId);
      return state;
    },
    removeContactFromGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const neededGroupIndex = state.findIndex(
        group => group.id === action.payload.groupId
      );
      const filteredGroupContacts = state[neededGroupIndex].contactIds.filter(
        id => id !== action.payload.contactId
      );

      state[neededGroupIndex].contactIds = filteredGroupContacts;
    },
    removeContactFromAllGroups(state, action: PayloadAction<{ id: string }>) {
      const filteredGroupsContacts = state.map(group => {
        if (group.contactIds.includes(action.payload.id)) {
          group.contactIds = group.contactIds.filter(
            id => id !== action.payload.id
          );
        }
        return group;
      });
      state = filteredGroupsContacts;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSliceGroups.endpoints.getGroups.matchFulfilled,
      (state, action) => (state = action.payload)
    );
  },
});
