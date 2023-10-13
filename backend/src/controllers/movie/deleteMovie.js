const { removeMovie } = require('../../repository/movie/deleteMovie.js');

exports.deleteOneMovie = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await removeMovie(id);
        if (result.length === 0) {
            res.status(404).json({message : `no movie with id ${id} found`});
            return;
        }
        res.status(200).json({message: 'Movie has been successfully deleted'});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
};