const query = require('../../../database.js').database;

exports.deleteOneMD = (idMovie) => {
    try {
        query(
            'DELETE FROM Movie_Director WHERE movieId = ?',
            [idMovie],
            (err, result) => {
                if (err) {
                    throw new Error(err);
                }
            }
            );
    }catch (error) {
        console.log(error);
        return 'erreur lors de la supression du lien entre le film et le réalisateur';
    }
}