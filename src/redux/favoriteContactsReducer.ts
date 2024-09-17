import {
  ADD_CONTACT_TO_FAVORITE,
  ProjectActions,
  ADD_CONTACT_FROM_FAVORITE,
} from './actions';

export {};

const initialState = {
  data: [] as string[],
};

export function favoriteContactsReducer(
  state = initialState,
  action: ProjectActions
) {
  switch (action.type) {
    case ADD_CONTACT_TO_FAVORITE:
      if (state.data.includes(action.payload.id)) return state;
      return {
        data: [...state.data, action.payload.id],
      };

    case ADD_CONTACT_FROM_FAVORITE:
      const filteredContacts = state.data.filter(
        id => id !== action.payload.id
      );
      return {
        data: filteredContacts,
      };

    default:
      break;
  }

  return state;
}
