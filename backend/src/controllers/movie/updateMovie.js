const xss = require('xss');
const query =  require('../../../database.js').database;
const { addActor } = require('../actors/addActor.js');
const { addDirector } =  require('../directors/addDirector.js');
const { deleteOneMA } = require('../movie_actor/deleteAllFromOneMovie.js');
const { deleteOneMD } = require('../movie_director/deleteOneMovie.js');
const { addOneMA } = require('../movie_actor/addOneMA.js');
const { addOneMD } = require('../movie_director/addOneMD.js');

exports.updateMovie = async (req, res, next) => {
    const { id } = req.params;
            //prevent xss attacks
            //Object.keys(req.body).forEach((key) )
    for (let element in req.body) {
        req.body[element] = xss(element);
    }
    
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
        query(
                    `UPDATE Movie SET 
                        title = ?, 
                        poster = ?, 
                        posterAlt = ?,
                        coverImgUrl = ?, 
                        coverImgAlt = ?, 
                        releaseDate = ?, 
                        length = ?,
                        synopsis = ?,
                        pg = ?,
                        trailer = ?,
                        warning = ?,
                        category= ?
        
                     WHERE id = ?`,
                    [
                        movie.title,
                        movie.poster,
                        movie.posterAlt,
                        movie.coverImgUrl,
                        movie.coverImgAlt,
                        movie.releaseDate,
                        movie.movieLength,
                        movie.synopsis,
                        movie.pg,
                        movie.trailerUrl,
                        movie.warning,
                        movie.categories,
                        id,
                    ],
                    (error) => {
    
                        if (error) {
                            throw new Error(error)

                        }
                    }
                )
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
        
         query(
            'SELECT id FROM Movie WHERE id = ?',
            [id],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                      error: 'Erreur serveur'
                    });
                    return;
                }
                
                if (results.length === 0) {
                    res.status(404).json({
                      error: `aucun film avec l'id ${id} n'a été trouvé`
                    });
                    return
                }
            }
        );
        res.status(200).json({message: 'Movie up to date'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Server Error'});
    }
};