const { v4 } = require('uuid');
const { insertMovie } = require('../../repository/movie/insertMovie.js');
const { addActor } = require('../../repository/actors/addActor.js');
const { addDirector } =  require('../../repository/directors/addDirector.js');
const { addOneMA } = require('../../repository/movie_actor/addOneMA.js');
const { addOneMD } = require('../../repository/movie_director/addOneMD.js');

exports.addMovie = async (req, res) => {
    
    const movie = {
        ...req.body,
        posterUrl: `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`,
        coverImgUrl: `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`
    };
    
    if (req.files.trailerFile) {
        movie.trailerUrl = `${req.protocol}://${req.get('host')}/videos/${req.files.trailerFile[0].filename}`;
    }
    
    const movieId = v4();

    try{
        
        await insertMovie(movieId, movie);
        const actorsPromise = await addActor(movie.mainActors, res);
        const directorsPromise = await addDirector(movie.director, res);
        const actorsId = await Promise.all(actorsPromise);
        const directorsId = await Promise.all(directorsPromise);
        
        actorsId.forEach(async (c) => {
            //MA refers to the table Movie_Actor
            await addOneMA(movieId, c);
 
        });
            
        directorsId.forEach(async (c) => {
            //MD refers to the table Movie_Director
            await addOneMD(movieId, c);

        });
        
        res.status(201).json({
            message: 'ok',
            movieId
        });
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
    
};