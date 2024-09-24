import { FilterFormValues } from 'src/components/FilterForm';
import { useAppSelector } from 'src/redux/hooks';
import { ContactDto } from 'src/types/dto/ContactDto';

export const useOnSubmit = (
  setContacts: React.Dispatch<React.SetStateAction<ContactDto[]>>
) => {
  const contactsState = useAppSelector(state => state.contactReducer.contacts);
  const groupsState = useAppSelector(state => state.contactReducer.groups);

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
