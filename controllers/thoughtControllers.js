const { User, Thought } = require('../../models');

module.exports = {
    // GET to get all thoughts
    getThoughts() {
        Thought.find().then((thoughts) => res.json(thoughts));
    },
    // GET to get a single thought by its _id
    getSingleThought() {
        Thought.findOne( {_id: req.params.id}
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: "Invalid ID" })
                : res.json(thought))
            .catch((err) => res.status(500).json(err)));
    },
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    // createThought() {

    // },
    // PUT to update a thought by its _id
    updateThought() {
        Thought.findOneandUpdate({_id: req.params.id}, { thoughtText: req.body.thoughtText })
        .then((thought) => 
            !thought
                ? res.status(404).json({message: "No user found with that ID"})
                : res.json(thought)
            .catch((err) => res.status(500).json(err)))
    },
    // DELETE to remove a thought by its _id
    deleteThought() {
        Thought.findOneAndDelete({_id: req.params.id})
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: "No thought found with that ID"})
                    : res.json({message: "Thought deleted!"})
                .catch((err) => res.status(500).json(err)))
    },
    // POST to create a reaction stored in a single thought's reactions array field - thoughtId
    addReaction() {
        Thought.findOneandUpdate({_id: req.params.thoughtId},
            {reactions: req.body})
        .then((thought) => 
            !thought
            ? res.status(404).json({message: "No thought found with that ID"})
            : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value - thoughtId
    deleteReaction() {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                  ? res.status(404).json({ message: 'No thought with that ID' })
                  : Student.deleteMany({ _id: { $in: thought.reactions } }))
              .then(() => res.json({ message: 'Thought and reactions deleted' }))
              .catch((err) => res.status(500).json(err));
    },
}