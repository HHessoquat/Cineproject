const query =  require('../../../database.js').database;

exports.deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        query(
                'DELETE FROM Room WHERE name = ?',
                [id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    });
} 