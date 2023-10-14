const express = require('express');
const router = express.Router();
const { addRoom } = require("../controllers/room/addRoom.js");
const { getAllRooms, getOneRoom } = require('../controllers/room/getRooms.js');
const { deleteRoom } = require('../controllers/room/deleteRoom.js');
const { updateRoom } = require('../controllers/room/updateRoom.js');

router.get('/', getAllRooms);
router.get('/:id', getOneRoom);
router.post('/', addRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom)
module.exports = router;