import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupDto } from 'src/types/dto/GroupDto';

// basic selectors
export const selectContacts = (state: RootState) => state.contacts;

export const selectContact = (
  state: RootState,
  contactId: string | undefined
) => state.contacts.find(({ id }) => id === contactId);

export const selectGroups = (state: RootState) => state.groups;

export const selectGroup = (state: RootState, groupId: string | undefined) =>
  state.groups.find(({ id }) => id === groupId);

// memoized selectors
export const selectFavoriteContacts = createSelector(
  [selectContacts, (state: RootState) => state.favorite],
  (contacts: ContactDto[], favorites: string[]): ContactDto[] => {
    return contacts.filter(({ id }) => favorites.includes(id));
  }
);

export const selectGroupContacts = createSelector(
  [selectContacts, selectGroup],
  (contacts: ContactDto[], group: GroupDto | undefined): ContactDto[] => {
    if (group) {
      return contacts.filter(({ id }) => group.contactIds.includes(id));
    }

    return [];
  }
);
