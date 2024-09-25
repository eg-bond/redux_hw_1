import { memo } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { AddGroupModal } from 'src/components/AddGroupModal';
import { GroupCard } from 'src/components/GroupCard';
import { LoadingButton } from 'src/components/LoadingButton';
import { useModal } from 'src/hooks/useModal';
import { useGetGroupsQuery } from 'src/redux/groups';
import { useAppSelector } from 'src/redux/hooks';
import { selectGroups } from 'src/redux/selectors';

export const GroupListPage = memo(() => {
  const { isLoading, isError } = useGetGroupsQuery();
  const groupsState = useAppSelector(selectGroups);

  const { show, handleClose, handleShow } = useModal();

  if (isLoading) return <LoadingButton text='Loading...' />;

  if (isError) {
    return (
      <Alert variant='danger'>Some error occurred while loading data</Alert>
    );
  }

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
