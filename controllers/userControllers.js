const { User, Thought } = require('../../models');

module.exports = {
    // GET all users
    getUser() {
        User.find().then((users) => res.json(users))
        .catch((err) => res.status(404).json(err)); 
    },
    // GET a single user by its _id and populated thought and friend data
    getSingleUser() {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .then((user) => 
                !user ? res.status(404).json({message: "No user found with that ID"})
                : res.json(user)
            .catch((err) => res.status(500).json(err)));
    },
    // POST a new user
    postNewUser() {
        User.create(req.body)
        .then((user) =>
            !user
                ? res.status(404).json({message: "Invalid submission"})
                : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // PUT to update a user by its _id
    updateUser() {
        User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body})
        .then((user) => 
            !user
                ? res.status(404).json({message: "Invalid submission"})
                : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove user by its _id
    deleteUser() {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
            !user
                ? res.status(404).json( {message: "No user was found"})
                : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json( {message: "User was deleted"} ))
            .catch((err) => res.status(500).json(err));
    },
    // POST to add a new friend to a user's friend list
    addFriend() {
        User.findOneAndUpdate( { _id: req.params.userId }, { friends: req.body }
        .then((user) => 
            !user
                ? res.status(404).json({message: "No user found with that ID"})
                : res.json(user)
        .catch((err) => res.status(500).json(err))));
    },
    // DELETE to remove a friend from a user's friend list
    deleteFriend() {
        Course.findOneAndDelete({friends: req.params.friendId})
        .then((user) =>
            !user
                ? res.status(404).json("No user found with that ID")
                : res.json(user))
        .catch((err) => res.status(500),json(err));
    },
}