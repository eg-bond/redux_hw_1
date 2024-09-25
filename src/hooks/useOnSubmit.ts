import { FilterFormValues } from 'src/components/FilterForm';
import { contactsStore, groupsStore } from 'src/mobx/store';
import { ContactDto } from 'src/types/dto/ContactDto';

export const useOnSubmit = (
  setContacts: React.Dispatch<React.SetStateAction<ContactDto[]>>
) => {
  const contactsState = contactsStore.contacts;
  const groupsState = groupsStore.groups;

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = contactsState;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(
        ({ name }) => name.toLowerCase().indexOf(fvName) > -1
      );
    }

    if (fv.groupId) {
      const groupContacts = groupsState.find(({ id }) => id === fv.groupId);
      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) =>
          groupContacts.contactIds.includes(id)
        );
      }
    }

    setContacts(findContacts);
  };

  return onSubmit;
};
