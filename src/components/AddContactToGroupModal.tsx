import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { groupsStore } from 'src/mobx/store';

interface IAddContactToGroupModal {
  handleClose: () => void;
  show: boolean;
  contactId: string;
}

export const AddContactToGroupModal = observer<IAddContactToGroupModal>(
  ({ handleClose, show, contactId }) => {
    const groupsState = groupsStore.groups;

    const FIRST_GROUP_ID = groupsState[0].id;

    const inputs = useRef({
      groupId: FIRST_GROUP_ID,
    });

    const handleChange = (
      e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
    ) => {
      inputs.current = { ...inputs.current, [e.target.name]: e.target.value };
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      groupsStore.addContactToGroup(contactId, inputs.current.groupId);
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
);
