const removeUser = require("../../repository/user/removeUser.js");
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const result = await removeUser(id);
        res.status(200).json({message: 'user deleted'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message : "server Error"});
    } 
    
} 

module.exports = deleteUser