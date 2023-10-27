const insertUser = require('../../repository/user/insertUser.js');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

async function addUser(req, res) {
    try {
        console.log(req.body.password)
        const userId = v4();
        
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if(err) {
                throw new Error(err);
            }
            console.log(hash);
            try {
                await insertUser(userId, req.body, hash);
            } catch (err) {
                console.log(err);
                res.status(500).json({message: 'server Error'});
            }
            res.status(200).json({message : 'nouvel utilisateur créé'});
        });
        
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
    
}

module.exports = addUser