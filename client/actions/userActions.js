import axios from 'axios';
import {
  GET_ALL_USERS,
  GET_PROFILE,
  DELETE_USER,
  DELETE_ACCOUNT,
  SEARCH_USERS
} from './types';

export const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
});

export const getAllUsersAction = offset => dispatch =>
  axios.get(`/users/?offset=${offset}`)
    .then((success) => {
      dispatch(getAllUsers(success.data));
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const getProfile = profile => ({
  type: GET_PROFILE,
  profile
});

export const getProfileAction = () => dispatch =>
  axios.get('/users/profile')
    .then((success) => {
      dispatch(getProfile(success.data));
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const editProfileAction = (userId, userDetails) => dispatch =>
  axios.put(`/users/${userId}`, userDetails)
    .then(() => {
      dispatch(getProfileAction());
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const deleteUser = user => ({
  type: DELETE_USER,
  user
});

export const deleteUserAction = userId => dispatch =>
  axios.delete(`/users/${userId}`)
    .then(() => {
      dispatch(getAllUsersAction());
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const editUserRoleAction = (userId, userDetails) => dispatch =>
  axios.put(`/users/${userId}`, userDetails)
    .then(() => {
      dispatch(getAllUsersAction(0));
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const deleteSelf = profile => ({
  type: DELETE_ACCOUNT,
  profile
});

export const logOutAction = () =>
  axios.post('/users/logout')
    .then(() => {
      localStorage.removeItem('token');
    })
    .catch((error) => {
      throw error.response.data.message;
    });

export const deleteSelfAction = userId => dispatch =>
  axios.delete(`/users/${userId}`)
    .then(() => {
      dispatch(logOutAction());
    })
    .catch((error) => {
      throw error.response.data.message;
    });


export const searchUsers = users => ({
  type: SEARCH_USERS,
  users
});

export const searchUserAction = searchWord => dispatch =>
  axios.get(`/search/users/?search=${searchWord}`)
    .then((success) => {
      dispatch(searchUsers(success.data));
    })
    .catch((error) => {
      throw error.response.data.message;
    });
