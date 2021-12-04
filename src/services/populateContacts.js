import axios from "axios";
import { dispatch } from "../store";
import { setUserContacts } from "../slices/contactSlice";



export const populateContacts = (userUid) => {

    axios.post('http://127.0.0.1:5000/get-contacts', {
        uid: userUid
    }).then(function (response) {

        const contacts = response.data.map(contact => contact.name)
        dispatch(setUserContacts(contacts))
        return contacts

    }).catch(function (error) {
        console.log(error);
    });

}
