import model from '../models';

const Documents = model.Documents;
const User = model.User;

export default {
  create(req, res) {
    req.body.ownerId = req.decoded.userId;
    Documents.findAll({
      where: {
        $and: {
          ownerId: req.decoded.userId,
          title: req.body.title
        }
      }
    })
    .then((document) => {
      if (document.length) {
        return res.status(409)
          .send({
            message: 'Note: Document with same title or content exists. ' +
            'Please modify title.'
          });
      }
      const userInfo = {};
      let documentInfo = {};
      Documents.create(req.body)
        .then((newDocument) => {
          User.findById(newDocument.ownerId)
            .then((owner) => {
              userInfo.userName = owner.userName;
              userInfo.roleId = owner.roleId;
              documentInfo = newDocument.dataValues;
              documentInfo.User = userInfo;
              res.status(201).send(documentInfo);
            });
        })
        .catch(error => res.status(400).send({
          message: error.message
        }));
    });
  },

  list(req, res) {
    const id = req.decoded.userId;
    const name = req.decoded.userName;
    const limit = req.query.limit || '10';
    const offset = req.query.offset || '0';
    if (req.query.limit < 0 || req.query.offset < 0) {
      return res.status(400)
        .send({ message: 'Only positive integers are allowed.' });
    }
    // if admin
    if (req.decoded.roleId === 1) {
      Documents.findAndCountAll({
        include: [{
          model: User,
          attributes: [
            'userName', 'roleId'
          ]
        }],
        limit,
        offset,
        order: '"createdAt" ASC'
      })
      .then((documents) => {
        const settings = limit && offset ? {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } : null;
        return res.status(200).send({
          documents: documents.rows, settings
        });
      })
      .catch(error => res.status(400).send({ message: error.message }));
      // not admin
    } else {
      Documents.findAndCountAll({
        include: [{
          model: User,
          attributes: [
            'userName', 'roleId'
          ]
        }],
        where: {
          $or: [
            // public
            { accessId: 1 },
            // private - your own
            { ownerId: id },
            {
              $and: [
                // role
                { accessId: 3 },
                // check if your role is same as document owner's role
                { '$User.roleId$': req.decoded.roleId }
              ]
            }
          ]
        },
        limit,
        offset,
        order: '"createdAt" ASC'
      })
        .then((documents) => {
          if (!documents) {
            return res
              .status(404)
              .send({
                message: `User ${name} with id:${id}` +
                'has no documents to view'
              });
          }
          const settings = limit && offset ? {
            totalCount: documents.count,
            pages: Math.ceil(documents.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: documents.rows.length
          } : null;
          return res.status(200).send({
            documents: documents.rows, settings
          });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    }
  },

  retrieve(req, res) {
    const id = req.params.id;
    Documents.findById(id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: `There is no document with id: ${id}`
            });
        }
        // if admin
        if (req.decoded.roleId === 1) {
          return res.status(200)
            .send(document);
        }
        // if document is public
        if (document.accessId === 1) {
          return res.status(200)
            .send(document);
        }
        // if document is private and person requesting is the owner
        if ((document.accessId === 2) &&
          (document.ownerId === req.decoded.userId)) {
          return res.status(200)
            .send(document);
        }
        // if document has role acess
        if (document.accessId === 3) {
          return User.findById(document.ownerId)
            .then((owner) => {
              // if owner role is same as requester's role
              if (owner.roleId === req.decoded.roleId) {
                return res.status(200)
                  .send(document);
              }
              // if owner role is different from requester's role
              return res.status(403)
                .send({
                  message: 'You are not permitted to access this document.'
                });
            });
        }
      // if document is private and person requesting is neither owner nor admin
        return res.status(403)
          .send({
            message: 'Private! You are not permitted to access this document. '
            + 'Request access from admin'
          });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

};