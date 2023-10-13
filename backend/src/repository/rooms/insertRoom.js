const query =  require('../../../database.js').database;

exports.insertRoom = (room) => {
    return new Promise((resolve, reject) => {
        query(
                'INSERT INTO Room (name, nbSeats, seatsDisplay) VALUES(?,?,?)',
                [room.name, room.nbSeats, JSON.stringify(room.seatsDisplay)],
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    }
                    resolve(result);
                }
            );
    });
} 