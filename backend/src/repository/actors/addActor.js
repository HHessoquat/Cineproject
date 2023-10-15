const query =  require('../../../database.js').database;
const { v4 } = require('uuid');

exports.addActor = (actors, res) => {
    
    //get all actors in an array --> [[firstName, lastName], [firstName, lastName]...]
    const cast = actors.split(',');
    
    return cast.map( async (c) => {
        return new Promise((resolve, reject) => {
            try {
                query(
                    'SELECT id FROM Actors WHERE name = ?',
                    [c],
                    (err, result) => {
                        if (err) {
                            
                            reject(err);
                            throw new Error(err);
                        }
                         if (result.length === 0) {
                             const newActorId = v4()
                             query(
                                 'INSERT INTO Actors (id, name) VALUES (?, ?)',
                                 [newActorId, c],
                                 (error, result) => {
                                     if (error) {
                                         throw new Error(error)
                                     }
                                     console.log('actor added');
                                     resolve(newActorId)
                                 }
                                 )
                         }
                         else {
                             result.forEach((current) => resolve(current.id))
                         }
                    }
            )
        } catch (error) {
            console.log(error)
            res.status(500).json({message: `erreur lors de l'enregistrement des acteurs`});
        }
        })
        
    });
}