const express = require('express');
const router = express.Router();
const { addSession } = require('../controllers/movieSession/addSession.js');


router.get('/', );
router.post('/', addSession);
router.get('/:id', );
router.put('/update/:id',);
router.delete('/:id', );

module.exports = router;
