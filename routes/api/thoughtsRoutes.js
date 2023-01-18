const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;