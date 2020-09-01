const { createUser, getUsers, getUserById, updateUser, deleteUser, login } = require('./user.controller');
const router = require('express').Router();

const { verifyToken } = require('../../auth/token_validation');

router.post('/create-user', verifyToken, createUser);
router.get('/get-users', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.patch('/update', verifyToken, updateUser);
router.delete('/delete-user', verifyToken, deleteUser);
router.post('/login', login);

module.exports = router;