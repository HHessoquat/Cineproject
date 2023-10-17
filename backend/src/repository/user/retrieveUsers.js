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

exports.retrieveOneByPseudo= (pseudo) => {
    return new Promise((resolve, reject) => {
    
        query(
                'SELECT * FROM Users WHERE pseudo = ?',
                [pseudo],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    console.log(result)
                    resolve(result);
                }
            )
    })
}



