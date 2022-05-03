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

create_user = async (req, res) => {
    try {

        //What's expected to be in the body of the request
        const {firstName, lastName, email, password, passwordCheck} = req.body;

        if (!firstName || !lastName || !email || !password || !passwordCheck) {
            return res.status(400).send({ error: 'All fields are required!' });
        }

        //checks if password has the correct length
        if (password < 6) {
            return res.status(400).send({ error: 'Password must be at least 6 characters!' });
        }

        //checks if password and passwordCheck match in the body of the request
        if (password !== passwordCheck) {
            return res.status(400).send({ error: 'Passwords do not match!' });
        }

        //checks if email is already in use in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email is already used by another acount!' });
        }

        //hashes the password
        //hash algorithms always produce the same result for a specific password, the genSalt adds security by creating randomness to the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
   
    const user = new User(
        {
            // more about the ... on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            ...req.body,
            password: hashedPassword,
            admin: false,
            
        }
        );

        //saves the user in the database
    user.save((err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(`$user with id ${user._id} has been created successfully`);
        }
    });
} catch (error) {
    res.status(500).send(error);
} 
};

modify_user = (req, res) => {

    User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, user) => {
        
            if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send();
        }
    });
}

delete_user = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`user with id ${user._id} has been deleted successfully`);
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
                token: jwt.sign(
                  { 
                    userId: user._id, 
                    isAdmin: user.admin
                  },
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