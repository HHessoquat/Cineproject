const query =  require('../../../database.js').database;

const MovieAndSessionQueryString = (field) => {
        return `SELECT 
                M.*, 
                GROUP_CONCAT(DISTINCT D.name) AS directors,
                GROUP_CONCAT(DISTINCT A.name) AS actors
            FROM 
                Movie AS M
            INNER JOIN Movie_Director AS MD ON M.id = MD.movieId
            INNER JOIN Directors AS D ON MD.directorId = D.id
            INNER JOIN Movie_Actor AS MA ON M.id = MA.idMovie
            Inner JOIN Actors as A  ON MA.idActor = A.id
            Where M.${field} = ?
            GROUP BY M.id`
}

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
            MovieAndSessionQueryString('id'),
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
            `SELECT
                Movie.id,
                Movie.title,
                Movie.posterAlt,
                Movie.poster,
                GROUP_CONCAT(DISTINCT  CONCAT(Session.date, ' ', Session.time, ' - ', Session.event) ORDER BY Session.date ASC SEPARATOR ', ') AS sessions,
                NULLIF(GROUP_CONCAT(DISTINCT Session.event), '') as event
            FROM Movie
            LEFT JOIN Session ON Movie.id = Session.idMovie
            WHERE online = ?
            AND (Session.id IS NULL OR CONCAT(Session.date, ' ', Session.time) > NOW())
            GROUP BY Movie.id`,
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

exports.retrieveMovieBytitle= (title) => {
    return new Promise((resolve, reject) => {
    
        query(
                MovieAndSessionQueryString('title'),
                [title],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    })
}