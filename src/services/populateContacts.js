import axios from "axios";

export const populateContacts = (userUid) => {

    axios.post('http://127.0.0.1:5000/get-contacts', {
        uid: userUid
    }).then(function (response) {
        console.log(response.data) 
    }).catch(function (error) {
        console.log(error);
    });

}