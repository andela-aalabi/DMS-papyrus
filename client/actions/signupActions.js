import axios from 'axios';
import attachAuthorizationToken from '../utils/attachToken';
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
      attachAuthorizationToken(
        success.data.token
        );
    })
    .catch((error) => {
      console.log(error);
    });
