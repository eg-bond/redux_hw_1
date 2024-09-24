import { memo, useEffect, useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useAppSelector } from 'src/redux/hooks';
import { useOnSubmit } from 'src/hooks/useOnSubmit';
import { AddContactModal } from 'src/components/AddContactModal';
import { useModal } from 'src/hooks/useModal';
import { useGetContactsQuery } from 'src/redux/contacts';
import { LoadingButton } from 'src/components/LoadingButton';

export const ContactListPage = memo(() => {
  const { isLoading, isError } = useGetContactsQuery();
  const contactsState = useAppSelector(state => state.contacts);
  const groupsState = useAppSelector(state => state.groups);

  const [contacts, setContacts] = useState<ContactDto[]>(contactsState);
  const onSubmit = useOnSubmit(setContacts);

  useEffect(() => setContacts(contactsState), [contactsState]);

  const { show, handleClose, handleShow } = useModal();

  return (
    <>
      <Button
        style={{ marginBottom: '1rem' }}
        onClick={handleShow}
        variant='success'>
        Add new contact
      </Button>
      <Row xxl={1}>
        <Col className='mb-3'>
          <FilterForm
            groupsList={groupsState}
            initialValues={{}}
            onSubmit={onSubmit}
          />
        </Col>
        <Col>
          {isLoading && <LoadingButton text={'Loading...'} />}
          {isError && (
            <>
              <Alert variant='danger'>
                Some error occured while loading data
              </Alert>
              <LoadingButton text={'Loading...'} />
            </>
          )}
          <Row xxl={4} className='g-4'>
            {contacts.map(contact => (
              <Col key={contact.id}>
                <ContactCard contact={contact} withLink />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <AddContactModal handleClose={handleClose} show={show} />
    </>
  );
});
