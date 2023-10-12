const query =  require('../../../database.js').database;
exports.addOneMD = (movieId, directorId) => {
    query(
                'INSERT INTO Movie_Director (movieId, directorId) VALUES (?,?)',
                [movieId, directorId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return `erreur lors de l'enregistrement des réalisateurs pour le film`;
                    }
                    console.log('directors association: ok');
                });
}