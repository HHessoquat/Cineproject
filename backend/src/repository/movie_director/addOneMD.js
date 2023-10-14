const query =  require('../../../database.js').database;
exports.addOneMD = (movieId, directorId) => {
    return new Promise((resolve, reject) => {
        query(
                'INSERT INTO Movie_Director (movieId, directorId) VALUES (?,?)',
                [movieId, directorId],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log('directors association: ok');
                    resolve(result);
                });
    });
}