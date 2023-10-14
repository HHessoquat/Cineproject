const query = require('../../../database.js').database;

exports.deleteOneMD = (idMovie) => {
    return new Promise((resolve, reject) => {
        query(
            'DELETE FROM Movie_Director WHERE movieId = ?',
            [idMovie],
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        );
    });
}