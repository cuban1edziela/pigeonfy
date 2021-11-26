import {signInWithEmailAndPassword as signIn, signOut} from "firebase/auth";
import {auth} from "../firebase";
import {
    refreshAuthFailure,
    refreshAuthFinish,
    refreshAuthSuccess,
    loginFailure,
    loginFinish,
    loginSuccess,
    refreshAuthInit,
    logout,
    load
} from "../slices/sessionSlice";

export const loginWithEmailAndPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(load())
        try {
            const user = await signIn(auth, email, password);
            dispatch(loginSuccess(user.user))
        } catch (error) {
            dispatch(loginFailure(error))
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
    }
}