import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupDto } from 'src/types/dto/GroupDto';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/',
  }),
  endpoints: builder => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => '385/h/0afc05779dcbbebd7055a1d87b8c7c6b.json',
    }),
    getGroups: builder.query<GroupDto[], void>({
      query: () => '0/h/f1e98b0d70d16a909818b03b72415733.json',
    }),
  }),
});
