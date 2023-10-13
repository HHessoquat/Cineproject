const query =  require('../../../database.js').database;
 exports.retrieveAllRooms = ()=> {
     return new Promise((resolve, reject) => {
         query(
                'SELECT name, nbSeats FROM Room',
                [],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
             );
     });
 }
 exports.retrieveOneRoom = (id) => {
    return new Promise((resolve, reject) => {
     query(
                'SELECT * FROM Room WHERE name = ?',
                [id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
             )
     });
 }