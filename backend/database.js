const mysql = require('mysql');

const pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DB
});


exports.database = (queryString, params, callback) => {

    pool.getConnection((error, connection) => {
        if (error) {
            console.error(`Erreur de connexion à la base de données ${error}`);
            callback(error);
            return;
        }
        console.log('Connection réussie à la base de données');

        connection.query(
            queryString,
            params,
            (error, result) => {

                connection.release();
                callback(error, result);
            }
        );
    });
}
