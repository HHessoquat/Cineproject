const { removeMovie } = require('../../repository/movie/deleteMovie.js');
const {retrieveOneMovie} = require('../../repository/movie/retrieveMovies.js');
const fs = require('fs');

exports.deleteOneMovie = async (req, res, next) => {
    try {
        const { id } = req.params
        const movie = await retrieveOneMovie(id);
        
        const fileToDelete = [movie[0].poster, movie[0].coverImgUrl, movie[0].trailer];
        
        fileToDelete.forEach((c) => {

            const fileRepertoryIndex = c.lastIndexOf('/', c.lastIndexOf('/') - 1);
            
            if ( fileRepertoryIndex !== -1) {
              const filePath = `../../../uploads/${c.substring(fileRepertoryIndex + 1)}`;
              fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('file has been successfully deleted');
                
            });
            } else {
              console.log("url to delete is not valid");
              res.status(400).json({error: "path to file is corrupted", message: "le film n'a pas pu être supprimé"});
              return;
            }
            
        })
        
        
        const result = await removeMovie(id);

        res.status(200).json({message: 'Movie has been successfully deleted'});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
};