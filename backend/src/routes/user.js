const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatUserData.js');
const addUser = require('../controllers/user/addUser.js');

router.get('/', );
router.get('/:id',);
router.post('/', escapeData, validateAndFormatData, addUser);
router.put('/:id', escapeData, validateAndFormatData,);
router.delete('/',);

module.exports = router