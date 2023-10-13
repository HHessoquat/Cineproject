const query =  require('../../../database.js').database;

exports.insertMovie = (id, session, idMovie) => {
    return new Promise((resolve, reject) => {
        const seats= ["a", "b"];
       query(
            'INSERT INTO Session (id, date, time, takenSeat, idMovie, idRoom) VALUES(?, ?, ?, ?, ?, ?)',
            [id, session.date, session.time, seats, idMovie, session.room],
            (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            }
        );
    });
    
}