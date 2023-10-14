const query =  require('../../../database.js').database;

exports.insertSession = (id, session) => {
    return new Promise((resolve, reject) => {
 
       query(
            'INSERT INTO Session (id, date, time, seatMap, idMovie, idRoom) VALUES(?, ?, ?, ?, ?, ?)',
            [id, session.date, session.time, JSON.stringify(session.seatMap), session.idMovie, session.idRoom],
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