const { addActor } = require('../../repository/actors/addActor.js');
const { addDirector } =  require('../../repository/directors/addDirector.js');
const { deleteOneMA } = require('../../repository/movie_actor/deleteAllFromOneMovie.js');
const { deleteOneMD } = require('../../repository/movie_director/deleteOneMovie.js');
const { addOneMA } = require('../../repository/movie_actor/addOneMA.js');
const { addOneMD } = require('../../repository/movie_director/addOneMD.js');
const putMovieToDatabase = require('../../repository/movie/updateMovie.js').updateMovie;

exports.updateMovie = async (req, res, next) => {
    const { id } = req.params;
    
    const movie = {
        title: req.body.movieTitle,
        poster: req.body.posterUrl,
        posterAlt: req.body.posterAlt,
        coverImgAlt: req.body.coverImgAlt,
        releaseDate: req.body.releaseDate,
        movieLength: req.body.movieLength,
        director: req.body.director,
        mainActors: req.body.mainActors,
        synopsis: req.body.synopsis,
        trailerUrl: req.body.trailerUrl,
        pg: req.body.pg,
        warning: req.body.warnings,
        categories: req.body.categories,
        coverImgUrl: req.body.coverImgUrl,
        trailerUrl: req.body.trailerUrl,
    };
    
    if (req.files && req.files.posterFile) {
        movie.poster = `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`;
    }
    
    if (req.files && req.files.coverImgFile){
        movie.coverImgUrl = `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`;
    }
    
    if (req.files && req.files.trailerFile) {
        movie.trailerUrl = `${req.protocol}://${req.get('host')}/videos/${req.files.trailerFile[0].filename}`;
    }
    
    try {
        const updateError = await putMovieToDatabase(movie, id);
        if (updateError) {
            throw new Error(updateError);
        }
        
        const actorsPromise = await addActor(movie.mainActors, res);
        const directorsPromise = await addDirector(movie.director, res);
        
        const actorsId = await Promise.all(actorsPromise);
        const directorsId = await Promise.all(directorsPromise);
        
        await deleteOneMA(id);
        await deleteOneMD(id)
        
        actorsId.forEach(async (c) => {
            //MA refers to the table Movie_Actor
            await addOneMA(id, c);
        });
        
        directorsId.forEach(async (c) => {
            //MD refers to the table Movie_Director
            await addOneMD(id, c);
        });
       
        res.status(200).json({message: 'Movie up to date'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Server Error'});
    }
};