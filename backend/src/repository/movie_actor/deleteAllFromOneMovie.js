const query = require('../../../database.js').database;

exports.deleteOneMA = (idMovie) => {
    return new Promise((resolve, reject) => {
        query(
            'DELETE FROM Movie_Actor WHERE idMovie = ?',
            [idMovie],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
                resolve(result);
            }
        );
    })
}