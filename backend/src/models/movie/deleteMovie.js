const query =  require('../../../database.js').database;

exports.removeMovie = (id) => {
    return new Promise((resolve, reject)=> {
        query(
                'SELECT * FROM Movie WHERE id = ?',
                [id],
                ((error, results) => {
                    if (error) {
                        reject(new Error(error));
                    }
                    
                    query(
                        'DELETE FROM Movie WHERE id = ? ',
                        [id],
                        (err, result) => {
                            if (err) {
                                throw new Error(err)
                            }
                        resolve(results);
                        
                        }
                    );
                })
            );
        
    }) 
    
}