import { apiSliceGroups } from './api';
import { groupsSlice } from './slice';

export const groupsReducer = groupsSlice.reducer;

export const { useGetGroupsQuery } = apiSliceGroups;

export const {
  addGroup,
  removeGroup,
  addContactToGroup,
  removeContactFromGroup,
  removeContactFromAllGroups,
} = groupsSlice.actions;
