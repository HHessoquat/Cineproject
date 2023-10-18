const query =  require('../../../database.js').database;

exports.insertSession = (id, session) => {
    return new Promise((resolve, reject) => {
 console.log(session)
       query(
            'INSERT INTO Session (id, date, time, event, seatMap, idMovie, idRoom) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [id, session.date, session.time, session.event, session.seatMap, session.idMovie, session.idRoom],
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