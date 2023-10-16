const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatRoomData.js');
const addUser = require('../controllers/user/addUser.js');

router.get('/', escapeData, validateAndFormatData,);
router.get('/:id',);
router.post('/', addUser);
router.put('/:id', escapeData, validateAndFormatData,);
router.delete('/',);

module.exports = router