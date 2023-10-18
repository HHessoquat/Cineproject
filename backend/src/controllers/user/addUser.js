const insertUser = require('../../repository/user/insertUser.js');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

function addUser(req, res) {
    try {
        console.log(req.body.password)
        const userId = v4();
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                throw new Error(err);
            }
            console.log(hash);
            insertUser(userId, req.body, hash);
            res.status(200).json({message : 'nouvel utilisateur créé'});
        });
        
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
    
}

module.exports = addUser