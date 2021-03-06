import express from 'express';
import documentController from '../controllers/documentsControllers';
import check from '../middleware/authenticate';

const document = express.Router();

document.route('/documents/')
  .get(check.verifyToken, documentController.list)
  .post(check.verifyToken, documentController.create);

document.route('/documents/:id')
  .get(check.verifyToken, documentController.retrieve)
  .put(check.verifyToken, documentController.update)
  .delete(check.verifyToken, documentController.destroy);

document.route('/users/:id/documents/')
  .get(check.verifyToken, documentController.listByUser);

document.route('/search/documents')
  .get(check.verifyToken, documentController.find);

module.exports = () => document;
