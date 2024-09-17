import { DATA_GROUP_CONTACT } from 'src/__data__';
import { ProjectActions } from './actions';

export {};

const initialState = {
  contacts: DATA_GROUP_CONTACT,
};

export function groupContactsReduser(
  state = initialState,
  action: ProjectActions
) {
  switch (action.type) {
    default:
      break;
  }

  return state;
}
