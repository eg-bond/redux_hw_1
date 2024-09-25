import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GroupDto } from 'src/types/dto/GroupDto';

export const apiSliceGroups = createApi({
  reducerPath: 'api/groups',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fs04.gcfiles.net/fileservice/file/download/a/177331/sc/',
  }),
  endpoints: builder => ({
    getGroups: builder.query<GroupDto[], void>({
      query: () => '0/h/f1e98b0d70d16a909818b03b72415733.json',
    }),
  }),
});
