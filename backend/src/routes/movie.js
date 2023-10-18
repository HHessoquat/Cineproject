const express = require('express');
const router = express.Router();
const escapeData = require('../middlewares/escapeData.js');
const { addMovie } = require('../controllers/movie/addMovie.js');
const { getAllMovies, getOneMovie, getOnlineMovies } = require('../controllers/movie/getMovies.js');
const { updateMovie } = require('../controllers/movie/updateMovie.js');
const { deleteOneMovie } = require('../controllers/movie/deleteMovie.js');
const multer = require('../middlewares/multer-config');
const {validateAndFormatMovie} = require('../middlewares/formatMovieData');

router.get('/', getAllMovies);
router.get('/', getOnlineMovies);
router.post('/', multer, escapeData, validateAndFormatMovie, addMovie);
router.get('/:id', getOneMovie);
router.put('/:id', multer, escapeData, validateAndFormatMovie, updateMovie);
router.delete('/:id', multer, deleteOneMovie);

module.exports = router;
