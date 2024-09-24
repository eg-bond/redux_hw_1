import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupDto } from 'src/types/dto/GroupDto';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const data: ContactDto[] = await fetch(
      'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json'
    ).then(res => res.json());

    return { contacts: data };
  }
);

export const fetchGroups = createAsyncThunk(
  'contacts/fetchGroups',
  async () => {
    const data: GroupDto[] = await fetch(
      'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/0/h/f1e98b0d70d16a909818b03b72415733.json'
    ).then(res => res.json());

    return { groups: data };
  }
);
