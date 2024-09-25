import { useEffect, useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useOnSubmit } from 'src/hooks/useOnSubmit';
import { AddContactModal } from 'src/components/AddContactModal';
import { useModal } from 'src/hooks/useModal';
import { observer } from 'mobx-react-lite';
import { LoadingButton } from 'src/components/LoadingButton';
import { contactsStore } from 'src/mobx/contactsStore';
import { groupsStore } from 'src/mobx/groupsStore';

export const ContactListPage = observer(() => {
  const contactsState = contactsStore.contacts;
  const groupsState = groupsStore.groups;

  const [filteredContacts, setFilteredContacts] =
    useState<ContactDto[]>(contactsState);

  const onSubmit = useOnSubmit(setFilteredContacts);

  const { show, handleClose, handleShow } = useModal();

  useEffect(() => setFilteredContacts(contactsState), [contactsState]);

  if (contactsStore.isLoading) return <LoadingButton text='Loading...' />;

  if (contactsStore.isError) {
    return (
      <Alert variant='danger'>Some error occurred while loading data</Alert>
    );
  }

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
          <Row xxl={4} className='g-4'>
            {filteredContacts.map(contact => (
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
