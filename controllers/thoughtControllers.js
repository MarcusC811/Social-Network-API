const { User, Thought } = require('../models');

module.exports = {
    // GET to get all thoughts
    getThoughts(req, res) {
        Thought.find().then((thoughts) => {res.json(thoughts)});
    },
    // GET to get a single thought by its _id
    getSingleThought(req, res) { 
        Thought.findOne( {_id: req.params.id} )
            .then((thought) => {
            !thought
                ? res.status(404).json({ message: "Invalid ID" })
                : res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: {thoughts: thought._id} },
                { new: true }
            );
        })
        .then((user) => {
            !user
            ? res.status(404).json({message: 'Created thought, but no user was found'})
            : res.json({message: 'Thought created!'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, { thoughtText: req.body.thoughtText })
        .then((thought) => 
            !thought
                ? res.status(404).json({message: "No user found with that ID"})
                : res.json(thought)
            .catch((err) => res.status(500).json(err)))
    },
    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: "No thought found with that ID"})
                    : res.json({message: "Thought deleted!"})
                .catch((err) => res.status(500).json(err)))
    },
    // POST to create a reaction stored in a single thought's reactions array field - thoughtId
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true})
        .then((thought) => 
            !thought
            ? res.status(404).json({message: "No thought found with that ID"})
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value - thoughtId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {$pull: {'reactions': {reactionId : req.params.reactionId}}},
            { new: true }
        )
            .then((thought) =>
                !thought
                  ? res.status(404).json({ message: 'No thought with that ID' })
                  : res.json({ message: 'Thought and reactions deleted' }))
            .catch((err) => res.status(500).json(err));
    },
}