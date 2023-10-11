const query =  require('../../../database.js').database;
const { v4 } = require('uuid');
const xss = require('xss');
const { addActor } = require('../actors/addActor.js');
const { addDirector } =  require('../directors/addDirector.js');

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
    
    const actorsPromise = await addActor(movie.mainActors, res);
    
    const directorsPromise = await addDirector(movie.director, res);
    
    try{
        const actorsId = await Promise.all(actorsPromise);
        const directorsId = await Promise.all(directorsPromise);
        
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
        );
            
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
            'INSERT INTO Movie(id, title, poster, posterAlt, coverImgUrl, coverImgAlt, releaseDate, length, synopsis, pg, trailer, warning, category, online) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
                movie.categories,
                movie.isOnline,
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