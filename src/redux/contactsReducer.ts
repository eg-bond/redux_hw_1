import { GroupDto } from 'src/types/dto/GroupDto';
import {
  ADD_CONTACT_FROM_FAVORITE,
  ADD_CONTACT_TO_FAVORITE,
  ProjectActions,
  REMOVE_CONTACT,
  REMOVE_GROUP,
  SET_CONTACTS,
  SET_GROUPS,
} from './actions';
import { ContactDto } from 'src/types/dto/ContactDto';

const initialState = {
  contacts: [] as ContactDto[],
  favorite: [] as string[],
  groups: [] as GroupDto[],
};

export function contactsReduser(state = initialState, action: ProjectActions) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
      };

    case REMOVE_CONTACT:
      const filteredContacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      return {
        ...state,
        contacts: filteredContacts,
      };

    case SET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups,
      };

    case REMOVE_GROUP:
      const filteredGroups = state.groups.filter(
        group => group.id !== action.payload.id
      );
      return {
        ...state,
        groups: filteredGroups,
      };

    case ADD_CONTACT_TO_FAVORITE:
      if (state.favorite.includes(action.payload.id)) return state;
      return {
        ...state,
        favorite: [...state.favorite, action.payload.id],
      };

    case ADD_CONTACT_FROM_FAVORITE:
      const filteredFavorites = state.favorite.filter(
        id => id !== action.payload.id
      );
      return {
        ...state,
        favorite: filteredFavorites,
      };

    default:
      break;
  }

  return state;
}
