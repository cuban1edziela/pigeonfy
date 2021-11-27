import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {auth, firestore} from "../firebase";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {doc, setDoc} from "firebase/firestore";
import { toast } from "react-toastify";

export const userCollectionName = "users"
export const createNewUser = createAsyncThunk("signUp/createNewUser", async (newUser, {rejectWithValue}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        await updateProfile(userCredential.user, {
            displayName: `${newUser.name} ${newUser.surname}`
        })
        const userDoc = doc(firestore, userCollectionName, userCredential.user.uid)
        await setDoc(userDoc, {})
        sendEmailVerification(userCredential.user)
        toast.success('Account successfully created')
        return {
            newUser: newUser,
            firebaseUser: userCredential.user
        }
    } catch (err) {
        toast.error('Couldnt create the account. Try again later')
        return rejectWithValue(err)
    }
});