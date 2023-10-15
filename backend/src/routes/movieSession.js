const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatMovieSessionData.js');
const { addSession } = require('../controllers/movieSession/addSession.js');
const { getSession } = require('../controllers/movieSession/getSession.js');
const { deleteSession, deleteMovieSessions } = require('../controllers/movieSession/deleteSession.js');

router.post('/', escapeData, validateAndFormatData , addSession);
router.get('/:movieId',  getSession);
router.delete('/:id', deleteSession);
router.delete('/all/:movieId', deleteMovieSessions)

module.exports = router;
