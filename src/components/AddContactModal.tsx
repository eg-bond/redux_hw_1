import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { contactsStore } from 'src/mobx/store';
interface IAddContactModal {
  handleClose: () => void;
  show: boolean;
}

export function AddContactModal({ handleClose, show }: IAddContactModal) {
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
    contactsStore.addContact({
      name: inputs.current.name,
      phone: inputs.current.phone,
      birthday: inputs.current.birthday,
      address: inputs.current.address,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Modal.Header closeButton>
          <Modal.Title>Adding new group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Contact name</Form.Label>
            <Form.Control name='name' placeholder='John Doe' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Contact phone</Form.Label>
            <Form.Control name='phone' placeholder='+7-(999)-999-99-99' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Contact birthday</Form.Label>
            <Form.Control name='birthday' />
          </Form.Group>
          <Form.Group className='mb-3'>
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
  );
}
