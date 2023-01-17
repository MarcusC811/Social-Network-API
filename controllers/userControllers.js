const { User, Thought } = require('../../models');

module.exports = {
    // GET all users
    getUser() {
        User.find().then((users) => res.json(users)).catch((err) => res.status(404).json(err)); 
    },
    // GET a single user by its _id and populated thought and friend data
    getSingleUser() {
        User.findOne({ _id: req.params.id }).select('-__v').then((user) => res.json(user).catch((err) => res.status(404).json(err)));
    },
    // POST a new user
    postNewUser() {
        User.create(req.body).then((user) => res.json(user)).catch((err) => res.status(404).json(err));
    },
    // PUT to update a user by its _id
    updateUser() {
        User.findOneAndUpdate({ _id: req.params.id }, {username: req.body.username}).then((user) => res.json(user)).catch((err) => res.status(404).json(err));
    },
    // DELETE to remove user by its _id
    deleteUser() {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => !user ? res.status(404).json( {message: "No user was found"}) : Thought.deleteMany({ _id: { $in: user.thought } }))
            .then(() => res.json( {message: "User was deleted"} ))
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a reaction stored in a single thought's reactions array field
    addReaction() {

    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction() {

    },
}