const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const moviesRoutes = require('./src/routes/movie');
const roomsRoutes = require('./src/routes/room');
const movieSessionRoutes = require('./src/routes/movieSession');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://jeremydequeant.ide.3wa.io:3000');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'src', 'assets')));
app.use(
    '/images',
    express.static(path.join(__dirname, 'uploads', 'images'))
);
app.use(
    '/videos',
    express.static(path.join(__dirname, 'uploads', 'videos'))
);

app.use('/api/movie', moviesRoutes);
app.use('/api/room', roomsRoutes);
app.use('/api/movieSession', movieSessionRoutes);

module.exports = app;
