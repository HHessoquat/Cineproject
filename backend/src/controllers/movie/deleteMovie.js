const query =  require('../../../database.js').database;

exports.deleteOneMovie = (req, res, next) => {
    Movie.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'film supprimé' }))
        .catch(() => res.status(400).json({ error: error }));
};