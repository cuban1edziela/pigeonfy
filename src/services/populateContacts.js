import axios from "axios";

export const populateContacts = (userUid) => {

    axios.post('http://127.0.0.1:5000/get-contacts', {
        uid: userUid
    }).then(function (response) {
        let contacts = response.data.split(',')
        console.log(contacts) 
    }).catch(function (error) {
        console.log(error);
    });

}