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