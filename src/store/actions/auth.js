import axios from 'axios';
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authDate: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
            // url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
        }
        url = url + 'AIzaSyCWT6sDGhK3u6Q3v17kkvb2vqw3JjoFGGg';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};