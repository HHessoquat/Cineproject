const query =  require('../../../database.js').database;

exports.retrieveSession = (movieId) => {
    return new Promise((resolve, reject) => {
        query(
                "SELECT id, DATE_FORMAT(date, '%Y-%m-%d') AS date, time, seatMap, idMovie, idRoom  FROM Session WHERE idMovie = ?",
                [movieId],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log('sessionRetrieved');
                    resolve(result);
                }
            )
    })  
}

exports.retrieveAllEventSessions = (event, nbSession) => {
    return new Promise((resolve, reject) => {
        query(`
            SELECT Session.*, Movie.*
            FROM Session
            INNER JOIN Movie ON Session.idMovie = Movie.id
            WHERE Session.event = ?
            AND Session.date >= CURDATE()
            ORDER BY Session.date
            LIMIT ?;
            `,
            [event, nbSession],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                console.log('sessionRetrieved');
                resolve(result);
            }
        );
    });
}

exports.retrieveOneSession = (id) => {
    return new Promise((resolve, reject) => {
        query(
                "SELECT id, seatMap, idMovie, idRoom  FROM Session WHERE id = ?",
                [id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log('sessionRetrieved');
                    resolve(result);
                }
            )
    })  
}