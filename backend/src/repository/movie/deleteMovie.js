const query =  require('../../../database.js').database;

exports.removeMovie = (id) => {
    return new Promise((resolve, reject)=> {

        query(
            'DELETE FROM Movie WHERE id = ? ',
            [id],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                }
            resolve(result);
            
            }
        );
        
    }) 
    
}