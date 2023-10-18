const query =  require('../../../database.js').database;

exports.retrieveAllMovies  = () => {
    return new Promise((resolve, reject) => {
        query(
            'SELECT id, title, posterAlt, poster FROM Movie',
            [],
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

exports.retrieveOneMovie = (id) => {
    
    return new Promise((resolve, reject) => {
      query(
            `SELECT 
                M.*, 
                GROUP_CONCAT(DISTINCT D.name) AS directors,
                GROUP_CONCAT(DISTINCT A.name) AS actors
            FROM 
                Movie AS M
            INNER JOIN Movie_Director AS MD ON M.id = MD.movieId
            INNER JOIN Directors AS D ON MD.directorId = D.id
            INNER JOIN Movie_Actor AS MA ON M.id = MA.idMovie
            Inner JOIN Actors as A  ON MA.idActor = A.id
            Where M.id = ?
            GROUP BY M.id`,
            [id],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                
                resolve(result);
                }
                
            );
    })
};

exports.retrieveOnlineMovies  = () => {
    return new Promise((resolve, reject) => {
        query(
            'SELECT id, title, posterAlt, poster FROM Movie WHERE online= ?',
            [1],
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