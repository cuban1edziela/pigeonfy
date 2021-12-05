import axios from "axios";
import { dispatch } from "../store";
import { setUserContacts } from "../slices/contactSlice";
import { URL } from '../config';
import { toast } from "react-toastify";


export const populateContacts = async (userUid) => {
    try {
        const res = await axios.post(URL.GET_CONTACTS, {
            uid: userUid
        })

        if (res.data === []) {
            dispatch(setUserContacts(['No contacts']))
        }

        const contacts = res.data.map(contact => contact.name)
        dispatch(setUserContacts(contacts))

    } catch (error) {
        console.log(error)
        toast.warning('No contacts', {position: 'bottom-left'})
    }
}
