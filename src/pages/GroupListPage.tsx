import { ChangeEvent, FormEvent, memo, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { GroupCard } from 'src/components/GroupCard';
import { addGroup } from 'src/redux/contacts';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const groupsState = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    dispatch(
      addGroup({
        name: inputs.current.name,
        description: inputs.current.description,
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
        Add new group
      </Button>
      <Row xxl={4}>
        {groupsState.map(group => (
          <Col key={group.id}>
            <GroupCard group={group} withLink />
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <Modal.Header closeButton>
            <Modal.Title>Adding new group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Group name</Form.Label>
              <Form.Control name='name' placeholder='name' />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'>
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
    </>
  );
});
