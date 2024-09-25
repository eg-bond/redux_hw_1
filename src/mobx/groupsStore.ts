import { makeAutoObservable } from 'mobx';
import { DEFAULT_IMAGE, GROUPS_URL } from 'src/constants/general';
import { generateUUID } from 'src/helpers/generateUUID';
import { GroupDto } from 'src/types/dto/GroupDto';

export const groupsStore = makeAutoObservable({
  groups: [] as GroupDto[],
  isLoading: false,
  isError: false,

  *fetchGroups() {
    this.isLoading = true;
    try {
      const response: GroupDto[] = yield fetch(GROUPS_URL).then(res =>
        res.json()
      );
      this.groups = response;
    } catch (error) {
      this.isError = true;
      this.groups = [];
    } finally {
      this.isLoading = false;
    }
  },

  addGroup: ({ name, description }: { name: string; description: string }) => {
    const newGroup = {
      id: generateUUID(),
      name: name,
      description: description,
      photo: DEFAULT_IMAGE,
      contactIds: [],
    };
    groupsStore.groups.push(newGroup);
  },

  removeGroup(id: string) {
    groupsStore.groups = groupsStore.groups.filter(group => group.id !== id);
  },

  addContactToGroup(contactId: string, groupId: string) {
    const group = groupsStore.groups.find(group => group.id === groupId);
    if (group && !group.contactIds.includes(contactId)) {
      group.contactIds.push(contactId);
    }
  },

  removeContactFromGroup(contactId: string, groupId: string) {
    const group = groupsStore.groups.find(group => group.id === groupId);
    if (group) {
      group.contactIds = group.contactIds.filter(id => id !== contactId);
    }
  },

  removeContactFromAllGroups(contactId: string) {
    groupsStore.groups = groupsStore.groups.map(group => ({
      ...group,
      contactIds: group.contactIds.filter(id => id !== contactId),
    }));
  },
});
