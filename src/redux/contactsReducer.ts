import { DATA_CONTACT } from 'src/__data__';
import { ProjectActions, REMOVE_CONTACT, SET_CONTACTS } from './actions';

const initialState = {
  data: DATA_CONTACT,
};

export function contactsReduser(state = initialState, action: ProjectActions) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        data: action.payload.contacts,
      };

    // case REMOVE_CONTACT:
    //   const filteredContacts = state.contacts.filter(
    //     contact => contact.id !== action.payload.id
    //   );

    //   return {
    //     contacts: filteredContacts,
    //   };

    default:
      break;
  }

  return state;
}
