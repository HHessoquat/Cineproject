const query =  require('../../../database.js').database;

function modifyUser(id, user) {
    return new Promise((resolve, reject) => {
        const queryString = `
            UPDATE Users
            SET
            name = ?,
            firstName = ?,
            email = ?,
            pseudo = ?,
            role = ?
            WHERE id= ?
        `;
        query(
                queryString,
                [user.name, user.firstName, user.email, user.pseudo, user.role, id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            )
    })
}

module.exports = modifyUser