import axios from "axios";
import { toast } from "react-toastify";

export const addContact = (uid, name, surname, n, e) => {

    axios.post('http://127.0.0.1:5000/add-contact', {
      uid: uid,
      name: name,
      surname: surname,
      n: n,
      e: e
    }).then(function (response) {
      console.log(response);
      toast.success('Contact added successfully', {position: 'bottom-left'})
    }).catch(function (error) {
      console.log(error);
      toast.error(error, {position: 'bottom-left'})
    });
}