const query =  require('../../../database.js').database;

function removeUser(id) {
    return new Promise((resolve, reject) => {
        query(
                'DELETE FROM Users WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            )
    })
}

module.exports = removeUser