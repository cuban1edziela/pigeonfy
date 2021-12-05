export const BASE_URL = "http://127.0.0.1:5000"

export const URL = {
    get GET_CONTACTS() {return `${BASE_URL}/get-contacts`},
    get ADD_CONTACT() {return `${BASE_URL}/add-contact`},
    get REMOVE_CONTACT() {return `${BASE_URL}/remove-contact`},
}
