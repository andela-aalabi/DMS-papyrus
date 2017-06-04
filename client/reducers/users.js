import {
  GET_ALL_USERS,
  DELETE_USER
} from '../actions/types';

let users;

const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers;
    case DELETE_USER:
      users = state.users
        .filter(user => user.id !== action.user.Document.id);
      return {
        users,
        settings: state.settings
      };
    default: return state;
  }
};

export default userReducer;
