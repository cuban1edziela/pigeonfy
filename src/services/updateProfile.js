import { updateProfile } from "firebase/auth";
import { useSelector } from 'react-redux';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const UpdateProfile = createAsyncThunk("updateProfile", async (newProfile) => {

    const session = useSelector(state => state.session)


    await updateProfile(session.user, {
        displayName: `${newProfile.name}`
    })

    toast.success('Name changed successfully', { position: 'bottom-left' })


});