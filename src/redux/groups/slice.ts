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
    },

    removeGroup(state, action: PayloadAction<{ id: string }>) {
      return state.filter(group => group.id !== action.payload.id);
    },

    addContactToGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const group = state.find(group => group.id === action.payload.groupId);
      if (group && !group.contactIds.includes(action.payload.contactId)) {
        group.contactIds.push(action.payload.contactId);
      }
    },

    removeContactFromGroup(
      state,
      action: PayloadAction<{ contactId: string; groupId: string }>
    ) {
      const group = state.find(group => group.id === action.payload.groupId);
      if (group) {
        group.contactIds = group.contactIds.filter(
          id => id !== action.payload.contactId
        );
      }
    },

    removeContactFromAllGroups(state, action: PayloadAction<{ id: string }>) {
      return state.map(group => ({
        ...group,
        contactIds: group.contactIds.filter(id => id !== action.payload.id),
      }));
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSliceGroups.endpoints.getGroups.matchFulfilled,
      (_, action) => (_ = action.payload)
    );
  },
});
