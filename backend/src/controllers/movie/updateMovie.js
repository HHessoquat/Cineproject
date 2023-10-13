const query =  require('../../../database.js').database;
const { addActor } = require('../../models/actors/addActor.js');
const { addDirector } =  require('../../models/directors/addDirector.js');
const { deleteOneMA } = require('../../models/movie_actor/deleteAllFromOneMovie.js');
const { deleteOneMD } = require('../../models/movie_director/deleteOneMovie.js');
const { addOneMA } = require('../../models/movie_actor/addOneMA.js');
const { addOneMD } = require('../../models//movie_director/addOneMD.js');
const putMovieToDatabase = require('../../models//movie/updateMovie.js').updateMovie;

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
    
    if (req. file && req.file.posterFile) {
        movie.poster = `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`;
    }
    
    if (req. file && req.file.coverImgFile){
        movie.coverImgUrl = `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`;
    }
    
    if (req. file && req.file.trailerFile) {
        movie.trailerUrl = `${req.protocol}://${req.get('host')}/images/${req.files.trailerFile[0].filename}`;
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
        
        actorsId.forEach((c) => {
            const checkAssociation = addOneMA(id, c);
            if (checkAssociation) {
                throw new Error(checkAssociation)
            }
        });
        
        directorsId.forEach((c) => {
            const checkAssociation = addOneMD(id, c);
            if (checkAssociation) {
                throw new Error(checkAssociation);
            }
        });
       
        res.status(200).json({message: 'Movie up to date'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Server Error'});
    }
};