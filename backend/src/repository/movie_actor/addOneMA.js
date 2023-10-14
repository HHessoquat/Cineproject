const query =  require('../../../database.js').database;

exports.addOneMA = (movieId, actorId) => {
    return new Promise((resolve, reject) => {
        query(
                'INSERT INTO Movie_Actor (idMovie, IdActor) VALUES (?,?)',
                [movieId, actorId],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log('actors association: ok');
                    resolve(result);
                });
    });
}