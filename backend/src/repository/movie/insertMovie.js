const query =  require('../../../database.js').database;

exports.insertMovie = (movieId, movie) => {
    return new Promise((resolve, reject) => {
        query(
            'INSERT INTO Movie(id, title, poster, posterAlt, coverImgUrl, coverImgAlt, releaseDate, length, synopsis, pg, trailer, warning, category, online) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                movieId,
                movie.movieTitle, 
                movie.posterUrl, 
                movie.posterAlt,
                movie.coverImgUrl,
                movie.coverImgAlt,
                movie.releaseDate, 
                movie.movieLength,
                movie.synopsis,
                movie.pg,
                movie.trailerUrl,
                movie.warnings,
                movie.categories,
                movie.isOnline,
            ],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            }
        );
    });
};