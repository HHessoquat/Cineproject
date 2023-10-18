const { retrieveAllMovies, retrieveOneMovie, retrieveOnlineMovies } = require('../../repository/movie/retrieveMovies.js');

exports.getAllMovies = async (req, res) => {
    try {
        const moviesResult = await retrieveAllMovies();
        res.status(200).json({ content: moviesResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getOneMovie = async (req, res, next) => {
    try{
        const { id } = req.params;
        const movieResult = await retrieveOneMovie(id);
        if (movieResult.length === 0) {
                    console.log('no movie Found');
                    res.status(404).json({message : 'no movie found'});
                    return;
                } 
        res.status(200).json(movieResult[0]);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
        
};

exports.getOnlineMovies = async (req, res) => {
    try {
        const moviesResult = await retrieveOnlineMovies();
        res.status(200).json({ content: moviesResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};