const query =  require('../../../database.js').database;
const { v4 } = require('uuid');

exports.addDirector = (directors, res) => {
    
    const directorsArray = directors.split(',');
    
    return directorsArray.map( async (c) => {
        return new Promise((resolve, reject) => {
            query(
                'SELECT id FROM Directors WHERE name = ?',
                [c],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        res.status(500).json({message: `erreur lors de l'enregistrement des réalisateurs`});
                        return
                    }
                     if (result.length === 0) {
                         const newDirectorId = v4()
                         query(
                             'INSERT INTO Directors (id, name) VALUES (?, ?)',
                             [newDirectorId, c],
                             (error, result) => {
                                 if (error) {
                                     console.log(error);
                                     res.status(500).json({message: `erreur lors de l'enregistrement des réalisateurs`});
                                 }
                                 
                                 resolve(newDirectorId)
                             }
                             )
                     }
                     else {
                         result.forEach((c) => resolve(c.id))
                     }
                }
                )
        })
        
    });
} 