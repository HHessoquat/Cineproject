const query =  require('../../../database.js').database;

exports.removeSession = (movieId) => {
    return new Promise((resolve, reject) => {
        query(
                "DELETE FROM Session WHERE ID= ?",
                [movieId],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log('sessionRetrieved');
                    resolve(result);
                }
            )
    })  
}