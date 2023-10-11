const query =  require('../../../database.js').database;
const { v4 } = require('uuid');

exports.addDirector = (directors, res) => {
    
    const directorsArray = directors.split(',').map((c, i) => c.split(' '));
    
    return directorsArray.map( async (c) => {
        c[1] = !c[1] ? ' ': c[1];
        return new Promise((resolve, reject) => {
            query(
                'SELECT id FROM Directors WHERE name = ? AND firstName = ?',
                [c[1], c[0]],
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
                             'INSERT INTO Directors (id, firstName, name) VALUES (?, ?, ?)',
                             [newDirectorId, c[0], c[1]],
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