const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatUserData.js');
const addUser = require('../controllers/user/addUser.js');
const getUsers = require("../controllers/user/getUsers.js");
const updateUser = require('../controllers/user/updateUser');
const deleteUser = require('../controllers/user/deleteUser.js');
const { login } = require("../controllers/user/logUser.js");

router.get('/', getUsers.getAllUsers);
router.get('/byName/:pseudo', getUsers.getUserByPseudo);
router.post('/', escapeData, validateAndFormatData, addUser);
router.post('/login', escapeData, login);
router.put('/:id', escapeData, validateAndFormatData, updateUser);
router.delete('/:id', deleteUser);

module.exports = router