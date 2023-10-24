const { retrieveAllMovies, retrieveOneMovie, retrieveOnlineMovies, retrieveMovieBytitle, retrieveEventMovie  } = require('../../repository/movie/retrieveMovies.js');

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
        
        const movieToCome = moviesResult.filter((c) => !c.sessions);
        const regularSessions = moviesResult.filter((c) => !c.event);
        const premiereSessions = moviesResult.filter((c) => c.event === 'premiere');
        const wednesdaySessions = moviesResult.filter((c) => c.event === "wednesday");
        const fridaySessions = moviesResult.filter((c) => c.event === 'friday');
        
        const sortedMovie = {movieToCome, regularSessions, premiereSessions, wednesdaySessions, fridaySessions}

        res.status(200).json({ content: sortedMovie});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMovieByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const result = await retrieveMovieBytitle(title);
        if (result.length === 0) {
            res.status(404).json({message: "no Movie found", content: null});
            return
        }
        res.status(200).json({message: 'fetch handled', content: result});
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}

exports.getEventMovie = async (req, res) => {
    try {
        const { event } = req.params
        const result = await retrieveEventMovie(event);
        if(result.length === 0) {
            res.status(404).json({message: 'No Movie Found', content: null});
            return
        }
        res.status(200).json({message: 'Got movie', content: result});
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'server Error'})
    }
}