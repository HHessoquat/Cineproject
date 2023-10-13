const express = require('express');
const router = express.Router();
const { addRoom } = require("../controllers/room/addRoom.js");
const { getAllRooms, getOneRoom } = require('../controllers/room/getRooms.js');
const { deleteRoom } = require('../controllers/room/deleteRoom.js')

router.get('/', getAllRooms);
router.post('/', addRoom);
router.delete('/:id', deleteRoom)
module.exports = router;