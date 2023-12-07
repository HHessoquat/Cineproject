const { retrieveAll } = require('../repository/user/retrieveUsers.js');

exports.atCreation = async (req, res, next) => {
    try {
        const users = await retrieveAll();
    
        users.forEach((c) => {
                if (req.body.pseudo === c.pseudo) {
                    throw new Error("Ce pseudo est déjà pris");
                }
                if (req.body.email === c.email) {
                    throw new Error("Il existe déjà un compte associé à cette addresse mail");
                }
        });
        next();
    }catch (err) {
        console.log(err);
        res.status(400).json({error: err, message: 'echec de la creation du compte'});
    }
}

exports.atUpdate = async (req, res, next) => {
    try {
        const users = await retrieveAll();
        const { id } = req.params;
    
        users.forEach((c) => {
                if (id !== c.id && req.body.pseudo === c.pseudo) {
                    throw new Error("Ce pseudo est déjà pris");
                }
                if (id !== c.id && req.body.email === c.email) {
                    throw new Error("Il existe déjà un compte associé à cette addresse mail");
                }
        });
        next();
    }catch (err) {
        console.log(err);
        res.status(400).json({error: err, message: 'echec de la mise à jour du compte'});
    }
}