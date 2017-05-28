import express from 'express';
import userController from '../controllers/userController';
import check from '../middleware/authenticate';


const user = express.Router();

user.route('/users/')
  .get(check.verifyToken,
    check.adminAccess, userController.getAllUsers)
  .post(userController.create);

user.route('/users/login')
  .post(userController.login);

user.route('/users/logout')
  .post(check.verifyToken, userController.logout);

user.route('/users/profile')
  .get(check.verifyToken, userController.profile);

module.exports = () => user;
