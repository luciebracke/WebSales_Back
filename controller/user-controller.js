const {User} = require('../models/user-schema');

getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
};

createUser = (req, res) => {
    const user = new User(
        {
            email: req.body.email,
            password: req.body.password,
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
}

modifyUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${user} with id ${user._id} has been modified successfully`);
        }
    });
}

deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`${user} with id ${user._id} has been deleted successfully`);
        }
    });
}

module.exports = {
    getAllUsers,
    createUser,
    modifyUser, 
    deleteUser
};