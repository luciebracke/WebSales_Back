const {User} = require('../models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

get_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
};

create_user = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    const user = new User(
        {
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.admin
        }
        );
    user.save((err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(`${user} with id ${user._id} has been created successfully`);
        }
    });
});
};

modify_user = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${user} with id ${user._id} has been modified successfully`);
        }
    });
}

delete_user = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${user} with id ${user._id} has been deleted successfully`);
        }
    });
}

user_login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).send({ error: 'User not found!' });
        } else if
        (!req.body.password){
            return res.status(401).send({ error: 'Password needed!'});
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).send({ error: 'Incorrect password!' });
            }
            res.status(200).send({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
            })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

module.exports = {
    get_all_users,
    create_user,
    modify_user, 
    delete_user,
    user_login
};