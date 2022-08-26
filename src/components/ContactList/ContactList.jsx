import styles from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { filterSelector, useFetchContactsQuery } from 'redux/contacts';
import { ContactListItem } from '../ContactListItem/ContactListItem';

export const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
  const filter = useSelector(filterSelector);

  const visibleContacts = useMemo(() => {
    if (!contacts) {
      return contacts;
    }
    if (filter.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  return (
    <ul className={styles.contactList}>
      {visibleContacts &&
        visibleContacts.map(contact => (
          <ContactListItem key={contact.id} {...contact} />
        ))}
    </ul>
  );
};
