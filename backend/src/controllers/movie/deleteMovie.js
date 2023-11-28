const { removeMovie } = require('../../repository/movie/deleteMovie.js');
const {retrieveOneMovie} = require('../../repository/movie/retrieveMovies.js');
const path = require('path');
const fs = require('fs');

exports.deleteOneMovie = async (req, res, next) => {
    try {
        const { id } = req.params
        const movie = await retrieveOneMovie(id);
        
        const fileToDelete = [movie[0].poster, movie[0].coverImgUrl, movie[0].trailer];
        
        fileToDelete.forEach((c) => {

            const parsedUrl = new URL(c);
            const pathname = parsedUrl.pathname;
            const filePath = path.join(__dirname, '../../../uploads', pathname);
            ;
            console.log(filePath);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('file has been successfully deleted');
                
            });

            
        })
        
        
        const result = await removeMovie(id);

        res.status(200).json({message: 'Movie has been successfully deleted'});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
};