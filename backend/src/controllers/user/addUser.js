const insertUser = require('../../repository/user/insertUser.js');
const { v4 } = require('uuid');

function addUser(req, res) {
    try {
        const userId = v4();
        console.log(req.body)
        insertUser(userId, req.body);
        res.status(200).json({message : 'nouvel utilisateur créé'})
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
    
}

module.exports = addUser