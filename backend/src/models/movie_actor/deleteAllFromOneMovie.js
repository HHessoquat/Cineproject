const query = require('../../../database.js').database;

exports.deleteOneMA = (idMovie) => {
    try {
        console.log(idMovie);
  
        query(
            'DELETE FROM Movie_Actor WHERE idMovie = ?',
            [idMovie],
            (err, result) => {
                if (err) {
                    throw new Error(err);
                }
            }
            );
    }catch (error) {
        console.log(error);
        return 'erreur lors de la supression du lien entre le film et l\'acteur';
    }
}