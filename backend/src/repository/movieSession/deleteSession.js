const query =  require('../../../database.js').database;

exports.removeSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        query(
                "DELETE FROM Session WHERE id= ?",
                [sessionId],
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

exports.removeMovieSessions = (movieId) => {
    return new Promise((resolve, reject) => {
        query(
            'DELETE FROM Session WHERE idMovie = ?',
            [movieId],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                resolve(result);
            }
            );
    })
}