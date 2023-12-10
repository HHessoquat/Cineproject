const query =  require('../../../database.js').database;
exports.updateMovie = (movie, id) => {
    return new Promise((resolve, reject) => {
        query(
            `UPDATE Movie SET 
                title = ?, 
                poster = ?, 
                posterAlt = ?,
                coverImgUrl = ?, 
                coverImgAlt = ?, 
                releaseDate = ?, 
                length = ?,
                synopsis = ?,
                pg = ?,
                trailer = ?,
                warning = ?,
                category = ?
            WHERE id = ?`,
            [
                movie.title,
                movie.poster,
                movie.posterAlt,
                movie.coverImgUrl,
                movie.coverImgAlt,
                movie.releaseDate,
                movie.movieLength,
                movie.synopsis,
                movie.pg,
                movie.trailerUrl,
                movie.warning,
                movie.categories,
                id,
            ],
            (error) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve();
                }
            }
        );
    });
};