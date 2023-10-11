const xss = require('xss');
const query =  require('../../../database.js').database;

exports.updateMovie = (req, res, next) => {
    console.log('passe update');
    const { id } = req.params;
            //prevent xss attacks
    for (let element in req.body) {
        element = xss(element);
    }
    console.log(req.body)
    const movie = {
        id: req.params.id,
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
    
    if (req. file && req.file.posterFile) {
        movie.poster = `${req.protocol}://${req.get('host')}/images/${req.files.posterFile[0].filename}`;
    }
    
    if (req. file && req.file.coverImgFile){
        movie.coverImgUrl = `${req.protocol}://${req.get('host')}/images/${req.files.coverImgFile[0].filename}`;
    }
    
    if (req. file && req.file.trailerFile) {
        movie.coverImgUrl = `${req.protocol}://${req.get('host')}/images/${req.files.trailerFile[0].filename}`;
    }
    res.status(200).json({message: 'ok'})
    
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
                return res.status(404).send({
                  error: `aucun de film avec l'id ${id} n'a été trouvé`
                });
            }


            query(
                `UPDATE Movie SET 
                    id = ?, 
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
                    movie.id,
                    movie.title,
                    movie.poster,
                    movie.posterAlt,
                    movie.coverImgUrl,
                    movie.coverImgAlt,
                    movie.releaseDate,
                    movie.length,
                    movie.synopsis,
                    movie.pg,
                    movie.trailer,
                    movie.warning,
                    movie.categories,
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
    )
};