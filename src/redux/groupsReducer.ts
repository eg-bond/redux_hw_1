import { ProjectActions, REMOVE_GROUP, SET_GROUPS } from './actions';
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
    case REMOVE_GROUP:
      const filteredGroups = state.data.filter(
        group => group.id !== action.payload.id
      );
      return {
        data: filteredGroups,
      };

    default:
      break;
  }

  return state;
}
