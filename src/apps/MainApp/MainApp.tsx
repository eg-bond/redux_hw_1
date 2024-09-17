import { useState } from 'react';
import './MainApp.scss';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import {
  ContactListPage,
  GroupPage,
  ContactPage,
  FavoriteListPage,
  GroupListPage,
} from 'src/pages';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { DATA_GROUP_CONTACT } from 'src/__data__';

export const MainApp = () => {
  const groupContactsState = useState<GroupContactsDto[]>(DATA_GROUP_CONTACT);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={
                <ContactListPage groupContactsState={groupContactsState} />
              }
            />
            <Route path='contact'>
              <Route
                index
                element={
                  <ContactListPage groupContactsState={groupContactsState} />
                }
              />
              <Route
                path=':contactId'
                element={
                  <ContactPage groupContactsState={groupContactsState} />
                }
              />
            </Route>
            <Route path='groups'>
              <Route
                index
                element={
                  <GroupListPage groupContactsState={groupContactsState} />
                }
              />
              <Route
                path=':groupId'
                element={<GroupPage groupContactsState={groupContactsState} />}
              />
            </Route>
            <Route
              path='favorit'
              element={
                <FavoriteListPage groupContactsState={groupContactsState} />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
