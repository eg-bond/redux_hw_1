import { ProjectActions, SET_CONTACTS } from './actions';
import { ContactDto } from 'src/types/dto/ContactDto';

const initialState = {
  data: [] as ContactDto[],
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
