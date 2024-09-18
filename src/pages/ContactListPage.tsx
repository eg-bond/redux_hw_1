import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useAppSelector } from 'src/redux/hooks';
import { useOnSubmit } from 'src/hooks/useOnSubmit';

export const ContactListPage = memo(() => {
  const contactsState = useAppSelector(state => state.contacts);
  const groupsState = useAppSelector(state => state.groups);

  const [contacts, setContacts] = useState<ContactDto[]>(contactsState);

  useEffect(() => setContacts(contactsState), [contactsState]);

  const onSubmit = useOnSubmit(setContacts);

  return (
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
          {contacts.map(contact => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
