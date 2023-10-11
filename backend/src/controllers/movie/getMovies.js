const query =  require('../../../database.js').database;

exports.getAllMovies = (req, res, next) => {
    query(
        'SELECT id, title, posterAlt,++ poster FROM Movie',
        [],
        (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: 'server error'});
            return
            }
            res.status(200).json({content: result})
        }
        )
}


exports.getOneMovie = async (req, res, next) => {
    const { id } = req.params;

    
       query( //inner Join + group_concat
            `SELECT 
                M.*, 
                GROUP_CONCAT(DISTINCT D.firstName, ' ', D.name) AS directors,
                GROUP_CONCAT(DISTINCT A.firstName, ' ', A.name) AS actors
            FROM 
                Movie AS M
            INNER JOIN Movie_Director AS MD ON M.id = MD.movieId
            INNER JOIN Directors AS D ON MD.directorId = D.id
            INNER JOIN Movie_Actor AS MA ON M.id = MA.idMovie
            Inner JOIN Actors as A  ON MA.idActor = A.id
            Where M.id = ?
            GROUP BY M.id`,
            [id],
            (err, result) => {
                if (err) {
                    console.error(err)
                    
                    res.status(500).json({message: 'server error'});
                    return;
                }
                if (result.length === 0) {
                    
                    res.status(404).json({message : 'no movie found'});
                    return;
                } 
                console.log(result);
                res.status(200).json(result[0]);
                }
                
            );
        
};