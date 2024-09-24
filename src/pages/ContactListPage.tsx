import {
  ChangeEvent,
  FormEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useOnSubmit } from 'src/hooks/useOnSubmit';
import { addContact } from 'src/redux/contacts';

export const ContactListPage = memo(() => {
  const contactsState = useAppSelector(state => state.contacts);
  const groupsState = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();

  const [contacts, setContacts] = useState<ContactDto[]>(contactsState);

  useEffect(() => setContacts(contactsState), [contactsState]);

  const onSubmit = useOnSubmit(setContacts);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputs = useRef({
    name: '',
    phone: '',
    birthday: '',
    address: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    inputs.current = { ...inputs.current, [e.target.name]: e.target.value };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addContact({
        name: inputs.current.name,
        phone: inputs.current.phone,
        birthday: inputs.current.birthday,
        address: inputs.current.address,
      })
    );
    handleClose();
  };

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
            {contacts.map(contact => (
              <Col key={contact.id}>
                <ContactCard contact={contact} withLink />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <Modal.Header closeButton>
            <Modal.Title>Adding new group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Contact name</Form.Label>
              <Form.Control name='name' placeholder='John Doe' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
              <Form.Label>Contact phone</Form.Label>
              <Form.Control name='phone' placeholder='+7-(999)-999-99-99' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
              <Form.Label>Contact birthday</Form.Label>
              <Form.Control name='birthday' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
              <Form.Label>Contact address</Form.Label>
              <Form.Control name='address' />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type={'submit'}>
              Add contact
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
});
