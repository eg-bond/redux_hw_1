import { useState } from 'react';
import './MainApp.scss';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import {
  ContactListPage,
  GroupPage,
  ContactPage,
  FavoritListPage,
  GroupListPage,
} from 'src/pages';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';

export const MainApp = () => {
  const favoriteContactsState = useState<FavoriteContactsDto>([
    DATA_CONTACT[0].id,
    DATA_CONTACT[1].id,
    DATA_CONTACT[2].id,
    DATA_CONTACT[3].id,
  ]);
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
                <ContactListPage
                  favoriteContactsState={favoriteContactsState}
                  groupContactsState={groupContactsState}
                />
              }
            />
            <Route path='contact'>
              <Route
                index
                element={
                  <ContactListPage
                    favoriteContactsState={favoriteContactsState}
                    groupContactsState={groupContactsState}
                  />
                }
              />
              <Route
                path=':contactId'
                element={
                  <ContactPage
                    favoriteContactsState={favoriteContactsState}
                    groupContactsState={groupContactsState}
                  />
                }
              />
            </Route>
            <Route path='groups'>
              <Route
                index
                element={
                  <GroupListPage
                    favoriteContactsState={favoriteContactsState}
                    groupContactsState={groupContactsState}
                  />
                }
              />
              <Route
                path=':groupId'
                element={
                  <GroupPage
                    favoriteContactsState={favoriteContactsState}
                    groupContactsState={groupContactsState}
                  />
                }
              />
            </Route>
            <Route
              path='favorit'
              element={
                <FavoritListPage
                  favoriteContactsState={favoriteContactsState}
                  groupContactsState={groupContactsState}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
