const query =  require('../../../database.js').database;

exports.retrieveAll = () => {
    return new Promise((resolve, reject) => {
        query(
                'SELECT * FROM Users',
                [],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    });
};


exports.retrieveOneById = (id) => {
    return new Promise((resolve, reject) => {
        query(
                'SELECT * FROM Users WHERE id = ?',
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

exports.retrieveOneByName = (user) => {
    return new Promise((resolve, reject) => {
        const firstName = `%${user.firstName}%`;
        const name = `%${user.name}%`;
        query(
                'SELECT * FROM Users WHERE name LIKE ? AND firstName LIKE ?',
                [name, firstName],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            )
    })
}



