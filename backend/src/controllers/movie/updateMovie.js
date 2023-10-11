const xss = require('xss');
const query =  require('../../../database.js').database;
const { addActor } = require('../actors/addActor.js');
const { addDirector } =  require('../directors/addDirector.js');

exports.updateMovie = async (req, res, next) => {
    const { id } = req.params;
            //prevent xss attacks
    for (let element in req.body) {
        element = xss(element);
    }
    console.log(req.body);
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
    res.status(200).json({message: 'ok'})
    
    const actorsPromise = await addActor(movie.mainActors, res);
    
    const directorsPromise = await addDirector(movie.director, res);
    
    try {
        const actorsId = await Promise.all(actorsPromise);
        const directorsId = await Promise.all(directorsPromise);
        
        actorsId.forEach((c) => {
            query(
                'SELECT * FROM Movie_Actor WHERE idMovie = ? AND idActor = ?',
                [id, c],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                      // if association doesn't exist, add it
                    if (result.length === 0) {
                        query(
                            'INSERT INTO Movie_Actor (idMovie, IdActor) VALUES (?,?)',
                            [id, c],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({message: `erreur lors de l'enregistrement de l'acteur pour le film`});
                                    return
                                }
                                console.log('actors association: ok');
                            });
                    }
                }
            );
        });
        
        directorsId.forEach((c) => {
            query(
                'SELECT * FROM Movie_Director WHERE movieId = ? AND directorId = ?',
                [id, c],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                     // if association doesn't exist, add it
                    if (result.length === 0) {
                        query(
                            'INSERT INTO Movie_Director (movieId, directorId) VALUES (?,?)',
                            [id, c],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({message: `erreur lors de l'enregistrement des réalisateurs pour le film`});
                                    return
                                }
                                console.log('directors association: ok');
                            });
                    }
                }
            );
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
                    return res.status(404).json({
                      error: `aucun film avec l'id ${id} n'a été trouvé`
                    });
                }
    
    
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
                            console.error(error);
                            res.status(500).json({
                              error: 'Erreur serveur'
                            });
                            return;
                        }
                        
                        res.status(200).json({
                            message: 'Movie up to date'
                        });
                    }
                )
            }
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Server Error'});
    }
};