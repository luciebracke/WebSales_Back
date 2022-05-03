const jwt = require('jsonwebtoken');
const {User} = require('../models/user-schema');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    let user = await User.findById(userId);
    let userRole = user.admin;

    if (userRole == false && isAdmin == false) {
      res.status(401).send( 'The user is not an admin and cannot access this resource!');
    } else {
      next();
    }
  } catch {
    res.status(401).send({
      error: 'Invalid request!'
    });
  }
};