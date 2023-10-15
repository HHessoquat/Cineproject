const express = require('express');
const router = express.Router();
const { addSession } = require('../controllers/movieSession/addSession.js');
const { getSession } = require('../controllers/movieSession/getSession.js');

router.post('/', addSession);
router.get('/:movieId',  getSession);
router.put('/update/:id',);
router.delete('/:id', );

module.exports = router;
