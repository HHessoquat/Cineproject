const express = require('express');
const router = express.Router();
const { addMovie } = require('../controllers/movie/addMovie.js');
const { getAllMovies, getOneMovie } = require('../controllers/movie/getMovies.js');
const { updateMovie } = require('../controllers/movie/updateMovie.js');
const { deleteOneMovie } = require('../controllers/movie/deleteMovie.js');
const multer = require('../middlewares/multer-config');

router.get('/', getAllMovies);
router.post('/',  multer, addMovie);
router.get('/:id', getOneMovie);
router.put('/update/:id', multer, updateMovie);
router.delete('/:id', multer, deleteOneMovie);

module.exports = router;
