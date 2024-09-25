import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { GroupCard } from 'src/components/GroupCard';
import { contactsStore, groupsStore } from 'src/mobx/store';
import { observer } from 'mobx-react-lite';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = groupsStore.groups.find(({ id }) => id === groupId);

  const groupContacts = () => {
    if (group) {
      return contactsStore.contacts.filter(({ id }) =>
        group.contactIds.includes(id)
      );
    }
    return [];
  };

  return (
    <Row className='g-4'>
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className='mx-auto'>
                <GroupCard group={group} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className='g-4'>
              {groupContacts().map(contact => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink groupId={group.id} />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
