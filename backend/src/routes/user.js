const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatUserData.js');
const addUser = require('../controllers/user/addUser.js');
const getUsers = require("../controllers/user/getUsers.js");
const updateUser = require('../controllers/user/updateUser');
const deleteUser = require('../controllers/user/deleteUser.js');
const { login, logout } = require("../controllers/user/logUser.js");
const {checkAdmin} = require('../middlewares/checkAuth');

router.get('/', getUsers.getAllUsers);
router.get('/byName/:pseudo', getUsers.getUserByPseudo);
router.get('/byId/:id', getUsers.getUserById)
router.post('/', checkAdmin, escapeData, validateAndFormatData, addUser);
router.put('/:id', checkAdmin, escapeData, validateAndFormatData, updateUser);
router.delete('/:id', checkAdmin, deleteUser);
router.post('/login', escapeData, login);
router.get('/logout', logout);

module.exports = router