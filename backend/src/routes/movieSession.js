const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const validateAndFormatData = require('../middlewares/formatMovieSessionData.js');
const { addSession } = require('../controllers/movieSession/addSession.js');
const { getSession } = require('../controllers/movieSession/getSession.js');
const { deleteSession, deleteMovieSessions } = require('../controllers/movieSession/deleteSession.js');
const {checkModerator} = require('../middlewares/checkAuth');

router.post('/', checkModerator, validateAndFormatData, escapeData, addSession);
router.get('/:movieId', getSession);
router.delete('/:id', checkModerator, deleteSession);
router.delete('/all/:movieId', checkModerator, deleteMovieSessions)

module.exports = router;
