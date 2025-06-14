const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/register', authController.createUser)
router.post('/login', authController.login)

router.use(authController.protect);

router.get('/', userController.getUsers);

router.get('/pending-connection', userController.getAllPendingCon)
router.get('/connection', userController.getAllConnections)

router.get('/feed', userController.requestFeed)

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router;