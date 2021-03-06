import axios from "axios";
import { toast } from "react-toastify";
import { URL } from '../config'

export const addContact = async (uid, name, surname, n, e) => {

  try {
    const res = await axios.post(URL.ADD_CONTACT, {
      uid: uid,
      name: name,
      surname: surname,
      n: n,
      e: e
    });
  
    console.log(res);
    toast.success(res.data, {position: 'bottom-left'});

  } catch(error) {
      console.log(error);
      toast.error('Error occured. Please try again later', {position: 'bottom-left'})
    };
}