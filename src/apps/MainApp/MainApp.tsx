import { useEffect } from 'react';
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
import { fetchContactsAction, fetchGroupsAction } from 'src/redux/actions';
import { useAppDispatch } from 'src/redux/hooks';

export const MainApp = () => {
  //initialization
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContactsAction());
    dispatch(fetchGroupsAction());
  }, []);

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint='xxs'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ContactListPage />} />
            <Route path='contact'>
              <Route index element={<ContactListPage />} />
              <Route path=':contactId' element={<ContactPage />} />
            </Route>
            <Route path='groups'>
              <Route index element={<GroupListPage />} />
              <Route path=':groupId' element={<GroupPage />} />
            </Route>
            <Route path='favorit' element={<FavoriteListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
