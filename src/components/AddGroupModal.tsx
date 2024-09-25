import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { groupsStore } from 'src/mobx/store';

interface IAddContactModal {
  handleClose: () => void;
  show: boolean;
}

export function AddGroupModal({ handleClose, show }: IAddContactModal) {
  const inputs = useRef({
    name: '',
    description: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    inputs.current = { ...inputs.current, [e.target.name]: e.target.value };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    groupsStore.addGroup({
      name: inputs.current.name,
      description: inputs.current.description,
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
            <Form.Label>Group name</Form.Label>
            <Form.Control name='name' placeholder='name' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Group description</Form.Label>
            <Form.Control name='description' as='textarea' rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type={'submit'}>
            Add group
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
