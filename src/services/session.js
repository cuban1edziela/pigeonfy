import {signInWithEmailAndPassword as signIn, signOut} from "firebase/auth";
import { toast } from "react-toastify";
import {auth} from "../firebase";
import {
    refreshAuthFailure,
    refreshAuthFinish,
    refreshAuthSuccess,
    loginFinish,
    loginSuccess,
    refreshAuthInit,
    logout,
    init
} from "../slices/sessionSlice";

export const loginWithEmailAndPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(init())
        try {
            const user = await signIn(auth, email, password);
            dispatch(loginSuccess(user.user))
            toast.success('Logged in successfully', {position: 'bottom-left'});
        } catch(e) {
            toast.error('Wrong password or email', {position: 'bottom-left'})
        } finally {
            dispatch(loginFinish())
        }
    }
}

export const refreshAuth = (user) => {
    return (dispatch) => {
        dispatch(refreshAuthInit())
        if (!!user) {
            dispatch(refreshAuthSuccess(user))
        } else {
            dispatch(refreshAuthFailure())
        }
        dispatch(refreshAuthFinish())
    }
}

export const logoutFromApp = () => {
    return async (dispatch) => {
        await signOut(auth)
        dispatch(logout())
        toast.success('Logged out successfully', {position: 'bottom-left'})
    }
}