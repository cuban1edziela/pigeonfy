import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDaYStMTdnjjpEbBJpT9GMdaat8DVm6Kc4",
    authDomain: "pigeonfy-1989.firebaseapp.com",
    projectId: "pigeonfy-1989",
    storageBucket: "pigeonfy-1989.appspot.com",
    messagingSenderId: "569786070051",
    appId: "1:569786070051:web:bfbdb3d00a8c85c6ad6d96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)