const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie');
const multer = require('../middlewares/multer-config');

router.get('/', movieCtrl.getAllMovies);
router.post('/',  multer, movieCtrl.createMovie);
router.get('/:id', movieCtrl.getOneMovie);
router.put('/update/:id', multer, movieCtrl.updateMovie);
router.delete('/:id', multer, movieCtrl.deleteOneMovie);

module.exports = router;
