const modifyUser = require("../../repository/user/modifyUser.js");
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const result = await modifyUser(id, req.body);
        res.status(200).json({message: 'user up-to-date'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message : "server Error"});
    } 
    
} 

module.exports = updateUser;