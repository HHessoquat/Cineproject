const express = require('express');
const router = express.Router();
const { addSession } = require('../controllers/movieSession/addSession.js');
const { getSession } = require('../controllers/movieSession/getSession.js');
const { deleteSession } = require('../controllers/movieSession/deleteSession.js');

router.post('/', addSession);
router.get('/:movieId',  getSession);
router.put('/update/:id',);
router.delete('/:id', deleteSession);

module.exports = router;
