const query =  require('../../../database.js').database;

exports.addOneMA = (movieId, actorId) => {
    query(
                'INSERT INTO Movie_Actor (idMovie, IdActor) VALUES (?,?)',
                [movieId, actorId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return `erreur lors de l'enregistrement de l'acteur pour le film`;
                    }
                    console.log('actors association: ok');
                });
}