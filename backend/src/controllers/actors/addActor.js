const query =  require('../../../database.js').database;
const { v4 } = require('uuid');

exports.addActor = (cast, res) => {
    
    return cast.map( async (c) => {
        c[1] = !c[1] ? ' ': c[1];
        return new Promise((resolve, reject) => {
            query(
        'SELECT id FROM Actors WHERE name = ? AND firstName = ?',
        [c[1], c[0]],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
                res.status(500).json({message: `erreur lors de l'enregistrement des acteurs`});
                return
            }
             if (result.length === 0) {
                 const newActorId = v4()
                 query(
                     'INSERT INTO Actors (id, firstName, name) VALUES (?, ?, ?)',
                     [newActorId, c[0], c[1]],
                     (error, result) => {
                         if (error) {
                             console.log(error);
                             res.status(500).json({message: `erreur lors de l'enregistrement des acteurs`});
                         }
                         resolve(newActorId)
                     }
                     )
             }
             else {
                 result.forEach((current) => resolve(current.id))
             }
        }
        )
        })
        
    });
}