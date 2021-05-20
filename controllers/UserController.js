const User = require('../models').User;
const expressSession = require('express-session');
const authService = require('../services/AuthService');
const output = require('../helpers/generateOutput');

const login = async (req, res) => {
    var googleId = req.body.googleId;
    var email = req.body.email;
    var firstName = req.body.givenName;
    var lastName = req.body.familyName;
    var picture = req.body.imageUrl;
    try {
        var user = await User.findOrCreate({
            where: { google_id: googleId},
            defaults: {
                google_id:googleId,
                first_name: firstName,
                last_name:lastName,
                email:email,
                picture: picture
            }
        });
        // console.log(user[0].dataValues.id);
    } catch (e) {
        console.log(e);
    }
    // console.log(user[0].dataValues.id);
    authService.signToken(req, res, user[0].dataValues.id);
}
module.exports = {
    login,
};



// module.exports = {
//   list(req, res) {
//     return User
//       .findAll({
//         include: [{
//           model: Presentation,
//           as: 'presentations'
//         }],
//         order: [
//           ['createdAt', 'DESC'],
//           [{ model: Presentation, as: 'presentations' }, 'createdAt', 'DESC'],
//         ],
//       })
//       .then((classrooms) => res.status(200).send(classrooms))
//       .catch((error) => { res.status(400).send(error); });
//   },

//   getById(req, res) {
//     return User
//       .findByPk(req.params.id, {
//         include: [{
//           model: Presentation,
//           as: 'presentations'
//         }],
//       })
//       .then((user) => {
//         if (!user) {
//           return res.status(404).send({
//             message: 'User Not Found',
//           });
//         }
//         return res.status(200).send(user);
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(400).send(error);
//       });
//   },

//   add(req, res) {
//     return User
//       .create({
//         class_name: req.body.class_name,
//       })
//       .then((user) => res.status(201).send(user))
//       .catch((error) => res.status(400).send(error));
//   },

//   update(req, res) {
//     return User
//       .findByPk(req.params.id, {
//         include: [{
//           model: Presentation,
//           as: 'presentations'
//         }],
//       })
//       .then(user => {
//         if (!user) {
//           return res.status(404).send({
//             message: 'User Not Found',
//           });
//         }
//         return user
//           .update({
//             class_name: req.body.class_name || user.class_name,
//           })
//           .then(() => res.status(200).send(user))
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },

//   delete(req, res) {
//     return User
//       .findByPk(req.params.id)
//       .then(user => {
//         if (!user) {
//           return res.status(400).send({
//             message: 'User Not Found',
//           });
//         }
//         return user
//           .destroy()
//           .then(() => res.status(204).send())
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },
// };
