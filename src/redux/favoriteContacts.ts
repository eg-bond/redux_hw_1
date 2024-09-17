import { DATA_CONTACT } from 'src/__data__';
import {
  ADD_FAVORITE_CONTACT,
  ProjectActions,
  REMOVE_FAVORITE_CONTACT,
} from './actions';

export {};

const initialState = {
  favoriteContacts: [
    DATA_CONTACT[0].id,
    DATA_CONTACT[1].id,
    DATA_CONTACT[2].id,
    DATA_CONTACT[3].id,
  ],
};

export function favoriteContactsReduser(
  state = initialState,
  action: ProjectActions
) {
  switch (action.type) {
    case ADD_FAVORITE_CONTACT:
      return {
        favoriteContacts: [...state.favoriteContacts, action.payload.id],
      };

    case REMOVE_FAVORITE_CONTACT:
      const filteredContacts = state.favoriteContacts.filter(
        id => id !== action.payload.id
      );
      return {
        favoriteContacts: filteredContacts,
      };

    default:
      break;
  }

  return state;
}
