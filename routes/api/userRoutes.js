const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    postNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

router.route('/').get(getUser).post(postNewUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/api/users/:userId/friends/:friendId').get(getUser).post(postNewUser);

