import { DATA_GROUP_CONTACT } from 'src/__data__';
import { ProjectActions } from './actions';

export {};

const initialState = {
  data: DATA_GROUP_CONTACT,
};

export function groupsReduser(state = initialState, action: ProjectActions) {
  switch (action.type) {
    default:
      break;
  }

  return state;
}
