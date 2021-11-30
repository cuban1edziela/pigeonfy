import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const userCollectionName = "users"
export const createNewUser = createAsyncThunk("signUp/createNewUser", async (newUser, {rejectWithValue}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        await updateProfile(userCredential.user, {
            displayName: `${newUser.name} ${newUser.surname}`
        })

        sendEmailVerification(userCredential.user)

        await axios.post('http://127.0.0.1:5000/new-user', {
            uid: userCredential.user.uid
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        
        toast.success('Account successfully created', {position: 'bottom-left'})

        return {
            newUser: newUser,
            firebaseUser: userCredential.user
        }
        
    } catch (e) {
        toast.error((e.code).slice(5, e.code.length))
        return rejectWithValue(e)
    }
});