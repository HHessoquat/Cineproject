const query =  require('../../../database.js').database;

exports.modifyRoom = (room, id) => {
    return new Promise((resolve, reject) => {
        query(
                `UPDATE Room SET 
                name = ?,
                nbSeats = ?,
                seatsDisplay = ?
                
                WHERE name= ?
                `,
                [
                    room.name,
                    room.nbSeats,
                    JSON.stringify(room.seatsDisplay),
                    id],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    });
} 