import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addContactToGroup } from 'src/redux/contacts';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

interface IAddContactModal {
  handleClose: () => void;
  show: boolean;
  contactId: string;
}

export function AddContactToGroupModal({
  handleClose,
  show,
  contactId,
}: IAddContactModal) {
  const groupsState = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();

  const inputs = useRef({
    groupId: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    inputs.current = { ...inputs.current, [e.target.name]: e.target.value };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContactToGroup({ contactId, groupId: inputs.current.groupId }));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Modal.Header closeButton>
          <Modal.Title>Choose group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select name='groupId'>
            {groupsState.map(group => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type={'submit'}>
            Add to selected group
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
