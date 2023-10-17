const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatUserData.js');
const addUser = require('../controllers/user/addUser.js');
const getUsers = require("../controllers/user/getUsers.js");

router.get('/', getUsers.getAllUsers);
router.get('/:id',);
router.get('/byName/:pseudo', getUsers.getUserByPseudo);
router.post('/', escapeData, validateAndFormatData, addUser);
router.put('/:id', escapeData, validateAndFormatData,);
router.delete('/',);

module.exports = router