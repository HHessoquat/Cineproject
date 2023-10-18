const query =  require('../../../database.js').database;

function insertUser(idUser, user, hash) {
    return new Promise((resolve, reject) => {
        query(
                'INSERT INTO Users (id, name, firstName, email, pseudo, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [idUser, user.name, user.firstName, user.email, user.pseudo, hash, user.role],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    });
}

module.exports = insertUser;