import { DATA_GROUP_CONTACT } from 'src/__data__';
import { ProjectActions, SET_GROUPS } from './actions';
import { GroupDto } from 'src/types/dto/GroupDto';

export {};

const initialState = {
  data: [] as GroupDto[],
};

export function groupsReduser(state = initialState, action: ProjectActions) {
  switch (action.type) {
    case SET_GROUPS:
      return {
        data: action.payload.groups,
      };
    default:
      break;
  }

  return state;
}
