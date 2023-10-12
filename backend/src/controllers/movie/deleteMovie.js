const query =  require('../../../database.js').database;

exports.deleteOneMovie = (req, res, next) => {
    try {
        const { id } = req.params
        query(
                'SELECT * FROM Movie WHERE id = ?',
                [id],
                ((error, results) => {
                    if (error) {
                        throw new Error(error);
                    }
                    if (results.length === 0) {
                        res.status(404).json({message : `no movie with id ${id} found`});
                    }
                    query(
                        'DELETE FROM Movie WHERE id = ? ',
                        [id],
                        (err, result) => {
                            if (err) {
                                throw new Error(err)
                            }
                        res.status(200).json({message: 'Movie has been successfully deleted'})
                        }
                    );
                })
            );
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
};