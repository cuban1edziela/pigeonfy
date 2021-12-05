import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setContact } from '../../slices/contactSlice';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { UnderLoad } from '../loading';
import { populateContacts } from '../../services/populateContacts';
import { addContact } from '../../services/addContact';
import { toast } from 'react-toastify';
import { removeContact } from '../../services/removeContact';
import { useHistory } from 'react-router';

export default function ContactBook() {

  const session = useSelector(state => state.session);
  const contact = useSelector(state => state.contact);
  const [reload, setReload] = useState(true);
  const [contactForm, setContactForm] = useState(false);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const getData = useCallback(() => {
    populateContacts(session.user.uid)
  }, [])

  useEffect(() => {
    getData()
    dispatch(setContact([]));
  }, [getData, contactForm, reload])

  const handleAddContact = () => { setContactForm(!contactForm) }
  const handleOnSendMessage = () => { 
    history.push('/encipher')
  }
  const handleRemoveContact = () => { 
    removeContact(contact.contactObjects[contact.userContacts.indexOf(contact.contact[0])]);
    dispatch(setContact([]));
    setReload(!reload);
  }


  //adding new contact
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const uid = session.user.uid
    const name = data.get('name');
    const surname = data.get('surname');
    const n = data.get('n');
    const e = data.get('e');

    if (uid === '' || name === '' || surname === '' || n === '' || e === '') {
      toast.error('Please fill all the required fields.', { position: 'bottom-left' })
    }
    else {
      addContact(uid, name, surname, n, e)
      setContactForm(!contactForm);
    }
  };


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    dispatch(setContact(newChecked));
  };


  return (
    <Box sx={{ display: 'inline-flex' }}>
      <List sx={{ width: 500, bgcolor: 'primary.main' }}>
        {contact.userContacts.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" color='secondary' aria-label="comments">
                  <CommentIcon onClick={handleOnSendMessage}/>
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    color='secondary'
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List>
        <ListItem>
          <Button
            sx={{ ml: 5, width: '100%' }}
            variant='outlined'
            onClick={handleAddContact}
            color="secondary">
            {contactForm ? 'CLOSE' : 'ADD CONTACT'}
          </Button>
        </ListItem>
        <ListItem>
          <Button
            sx={{ ml: 5, width: '100%' }}
            variant='outlined'
            onClick={handleRemoveContact}
            color="secondary">
            REMOVE CONTACT
          </Button>
        </ListItem>
        <ListItem>
          <Button
            sx={{ ml: 5, width: '100%' }}
            variant='outlined'
            onClick={handleAddContact}
            color="secondary">
            UPDATE CONTACT
          </Button>
        </ListItem>
      </List>

      {contactForm ?
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <List>
            <ListItem>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
              />
              <TextField
                required
                fullWidth
                name="surname"
                label="Surname"
                type="surname"
                id="surname"
              />
            </ListItem>
            <ListItem>
              <TextField
                required
                fullWidth
                id="n"
                label="n"
                name="n"
                autoComplete="n"
              />
              <TextField
                required
                fullWidth
                name="e"
                label="e"
                type="e"
                id="e"
              />
            </ListItem>
          </List>
          <Button
            type="submit"
            variant='outlined'
            sx={{ width: '100%' }}
            color='secondary'
          >
            ADD CONTACT
          </Button>
        </Box>
        : ''}

    </Box>
  );
}
