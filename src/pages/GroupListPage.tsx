import { memo } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { AddGroupModal } from 'src/components/AddGroupModal';
import { GroupCard } from 'src/components/GroupCard';
import { LoadingButton } from 'src/components/LoadingButton';
import { useModal } from 'src/hooks/useModal';
import { useGetGroupsQuery } from 'src/redux/groups';
import { useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const { isLoading, isError } = useGetGroupsQuery();
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
      <Col>
        {isLoading && <LoadingButton text={'Loading...'} />}
        {isError && (
          <Alert variant='danger'>Some error occured while loading data</Alert>
        )}
        <Row xxl={4}>
          {groupsState.map(group => (
            <Col key={group.id}>
              <GroupCard group={group} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
});
