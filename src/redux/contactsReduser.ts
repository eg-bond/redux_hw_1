import { DATA_CONTACT } from 'src/__data__';
import { ProjectActions, REMOVE_CONTACT, SET_CONTACTS } from './actions';

export {};

const initialState = {
  contacts: DATA_CONTACT,
};

export function contactReduser(state = initialState, action: ProjectActions) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        contacts: action.payload.contacts,
      };

    case REMOVE_CONTACT:
      const filteredContacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );

      return {
        contacts: filteredContacts,
      };

    default:
      break;
  }

  return state;
}
