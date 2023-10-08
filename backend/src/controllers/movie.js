const query =  require('../../database.js').database;
const { v4 } = require('uuid');
const xss = require('xss');

exports.getAllMovies = (req, res, next) => {}


exports.createMovie = (req, res, next) => {
    
    const movie = {...req.body};
    console.log(query)
    if (req.files['posterFile'] && req.files['posterFile'][0]) {
        const posterUrl = `${req.protocol}://${req.get('host')}/images/${
            req.files['posterFile'][0].filename
        }`;
    }

    if (req.files['trailerFile'] && req.files['trailerFile'][0]) {
        const trailerUrl = `${req.protocol}://${req.get('host')}/videos/${
            req.files['trailerFile'][0].filename
        }`;
    }
    query(
        'INSERT INTO Movie(id, title, poster, posterAlt, releaseDate, length, director, cast, synopsis, pg, trailer, warning, category) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            v4(),
            movie.movieTitle, 
            movie.posterUrl, 
            movie.posterAlt, 
            movie.releaseDate[1], 
            movie.length,
            movie.director,
            movie.mainActors,
            movie.synopsis,
            movie.pg,
            movie.trailerUrl,
            movie.warnings,
            movie.category
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('server Error');
                return
            }
            res.status(201).redirect('/');
        }
        );
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
