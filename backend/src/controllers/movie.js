const query =  require('../../database.js').database;
const { v4 } = require('uuid');
const xss = require('xss');

exports.getAllMovies = (req, res, next) => {}


exports.createMovie = async (req, res, next) => {
    const movie = {
        ...req.body,
        posterUrl: `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`,
        coverImgUrl: `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`
    };
    const movieId = v4();
    const actorsId = [];
    const directorsId = [];
    
    
    //get all actors in an array --> [[firstName, lastName], [firstName, lastName]...]
    const cast = movie.mainActors.split(',').map((c, i) => c.split(' '));
    
    const actorsPromise = await cast.map( async (c) => {
        return new Promise((resolve, reject) => {
            query(
        'SELECT id FROM Actors WHERE name = ? AND firstName = ?',
        [c[1], c[0]],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
                res.status(500).json({message: `erreur lors de l'enregistrement des acteurs`});
                return
            }
             if (result.length === 0) {
                 const newActorId = v4()
                 query(
                     'INSERT INTO Actors (id, firstName, name) VALUES (?, ?, ?)',
                     [newActorId, c[0], c[1]],
                     (error, result) => {
                         if (error) {
                             console.log(error);
                             res.status(500).json({message: `erreur lors de l'enregistrement des acteurs`});
                         }
                         actorsId.push(newActorId);
                         resolve(newActorId)
                     }
                     )
             }
             else {
                 result.forEach((c) => actorsId.push(c.id))
                 resolve(c.id)
             }
        }
        )
        })
        
    })
    
    const directors = movie.director.split(',').map((c, i) => c.split(' '));
    console.log(directors)
    
    const directorsPromise = await directors.map( async (c) => {
        return new Promise((resolve, reject) => {
            query(
        'SELECT id FROM Actors WHERE name = ? AND firstName = ?',
        [c[1], c[0]],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
                res.status(500).json({message: `erreur lors de l'enregistrement des réalisateurs`});
                return
            }
             if (result.length === 0) {
                 const newDirectorId = v4()
                 query(
                     'INSERT INTO Directors (id, firstName, name) VALUES (?, ?, ?)',
                     [newDirectorId, c[0], c[1]],
                     (error, result) => {
                         if (error) {
                             console.log(error);
                             res.status(500).json({message: `erreur lors de l'enregistrement des réalisateurs`});
                         }
                         directorsId.push(newDirectorId);
                         resolve(newDirectorId)
                     }
                     )
             }
             else {
                 result.forEach((c) => directorsId.push(c.id))
                 resolve(c.id)
             }
        }
        )
        })
        
    })
    
    try{
        await Promise.all(actorsPromise);
        await Promise.all(directorsPromise);
        
        actorsId.forEach((c) => query(
            'INSERT INTO Movie_Actor (idMovie, IdActor) VALUES (?,?)',
            [movieId, c],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({message: `erreur lors de l'enregistrement de l'acteur pour le film`});
                    return
                }
                console.log('actors association: ok');
            })
            )
            
        directorsId.forEach((c) => query(
            'INSERT INTO Movie_Director (movieId, directorId) VALUES (?,?)',
            [movieId, c],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({message: `erreur lors de l'enregistrement du réalisateurs pour le film`});
                    return
                }
                console.log('director association: ok');
            })
            )
        query(
        'INSERT INTO Movie(id, title, poster, posterAlt, coverImgUrl, coverImgAlt, releaseDate, length, synopsis, pg, trailer, warning, category) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            movieId,
            movie.movieTitle, 
            movie.posterUrl, 
            movie.posterAlt,
            movie.coverImgUrl,
            movie.coverImgAlt,
            movie.releaseDate, 
            movie.movieLength,
            movie.synopsis,
            movie.pg,
            movie.trailerUrl,
            movie.warnings,
            movie.categories
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('server Error');
                return
            }
            
        }
        );
        res.status(201).json({
            message: 'ok'
        });
        
    }
    catch (err) {
        console.log(err)
    }
    
};
exports.getOneMovie = (req, res, next) => {
    const { id } = req.params;
                query(
                    `SELECT * FROM movie Where id = ?`,
                    [id],
                    (err, result) => {
                        if (err) {
                            console.error(err)
                            res.status(500).send('server error');
                        }
                    if (result.length === 0) {
                        res.status(404).send('no movie found');
                        return
                    } 
                        const movie = result[0];
                        console.log(movie);
                        res.status(200).json(movie);
                    });
};
exports.updateMovie = (req, res, next) => {
    const { id } = req.params;
    const movie = {
        _id: req.params.id,
        title: req.body.title,
        poster: req.body.posterUrl,
        posterAlt: req.body.posterAlt,
        releaseDate: req.body.releaseDate,
        length: req.body.length,
        director: req.body.director,
        mainActors: req.body.mainActors,
        synopsis: req.body.synopsis,
        trailerUrl: req.body.trailerUrl,
        pg: req.body.pg,
        warning: req.body.warning,
        categories: req.body.categories,
    };
    
    query(
        'SELECT id FROM users WHERE id = ?',
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
                return res.status(404).send({
                  error: `L'utilisateur avec l'id ${id} n' pas été trouvé`
                });
            }

            const userToUpdate = {
                id,
                pseudo: xss(req.body.pseudo),// !!! Important
                role: results[0].role
            }


            query(
                'UPDATE users SET pseudo = ? WHERE id = ?',
                [userToUpdate.pseudo, userToUpdate.id],
                (error) => {

                    if (error) {
                        console.error(error);
                        res.status(500).json({
                          error: 'Erreur serveur'
                        });
                        return;
                    }
                    
                    res.json({
                        data: userToUpdate
                    });
                }
            )
        }
    )
};


exports.deleteOneMovie = (req, res, next) => {
    Movie.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'film supprimé' }))
        .catch(() => res.status(400).json({ error: error }));
};
