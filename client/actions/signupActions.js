import axios from 'axios';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = userInfo => ({
  type: SET_CURRENT_USER,
  userInfo
});

export const userSignupRequest = userData =>
  dispatch => axios.post('users/', userData)
    .then((success) => {
      localStorage.setItem('token', success.data.token);
      dispatch(setCurrentUser(success.data.existingUser));
    })
    .catch((error) => {
      console.log(error);
    });