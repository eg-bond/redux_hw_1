import { memo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { AddGroupModal } from 'src/components/AddGroupModal';
import { GroupCard } from 'src/components/GroupCard';
import { useModal } from 'src/hooks/useModal';
import { useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const groupsState = useAppSelector(state => state.groups);

  const { show, handleClose, handleShow } = useModal();

  return (
    <>
      <AddGroupModal handleClose={handleClose} show={show} />
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
    </>
  );
});
