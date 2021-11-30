import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setContact } from '../../slices/contactSlice';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from "axios";
import { UnderLoad } from '../loading';

export default function CheckboxList() {

  const [contactForm, setContactForm] = useState(false);
  const [checked, setChecked] = useState([0]);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  const contacts = ['Marcin Gorzala', 'Jakub Pet', 'Aneta Popielnica']

  if(session.loading) {
    UnderLoad();
  }

  const handleAddContact = () => {
    setContactForm(!contactForm)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const uid = session.user.uid
    const name = data.get('name');
    const surname = data.get('surname');
    const n = data.get('n');
    const e = data.get('e');

    axios.post('http://127.0.0.1:5000/add-contact', {
      uid: uid,
      name: name,
      surname: surname,
      n: n,
      e: e
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

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
    dispatch(setContact(newChecked))
  };

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <List sx={{ width: 500, bgcolor: 'primary.main' }}>
        {contacts.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" color='secondary' aria-label="comments">
                  <CommentIcon />
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
            onClick={handleAddContact}
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
