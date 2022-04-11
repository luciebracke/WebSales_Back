const {User} = require('../models/user-schema');

get_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
};

create_user = (req, res) => {
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

module.exports = {
    get_all_users,
    create_user,
    modify_user, 
    delete_user
};