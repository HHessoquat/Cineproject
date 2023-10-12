const { v4 } = require('uuid');
const xss = require('xss');
const { insertMovie } = require('../../models/movie/insertMovie.js');
const { addActor } = require('../../models/actors/addActor.js');
const { addDirector } =  require('../../models/directors/addDirector.js');
const { addOneMA } = require('../../models/movie_actor/addOneMA.js');
const { addOneMD } = require('../../models//movie_director/addOneMD.js');

exports.addMovie = async (req, res, next) => {
    for (let element in req.body) {
        element = xss(element);
    }
    const movie = {
        ...req.body,
        posterUrl: `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`,
        coverImgUrl: `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`
    };
    
    if (req.files.trailerFile) {
        movie.coverImgUrl = `${req.protocol}://${req.get('host')}/images/${req.files.trailerFile[0].filename}`;
    }
    
    const movieId = v4();
    
    try{
        
        const errorAdd = await insertMovie(movieId, movie);
        const actorsPromise = await addActor(movie.mainActors, res);
        const directorsPromise = await addDirector(movie.director, res);
        const actorsId = await Promise.all(actorsPromise);
        const directorsId = await Promise.all(directorsPromise);
        
        actorsId.forEach((c) => {
            //MA refers to the table Movie_Actor
            const errorMA = addOneMA(movieId, c);
            if (errorMA) {
                throw new Error(errorMA);
            }
        });
            
        directorsId.forEach((c) => {
            //MD refers to the table Movie_Director
            const errorMD = addOneMD(movieId, c);
            if (errorMD) {
                throw new Error(errorMD);
            }
        });
        
        res.status(201).json({
            message: 'ok'
        });
        
    }
    catch (err) {
        console.log(err)
    }
    
};