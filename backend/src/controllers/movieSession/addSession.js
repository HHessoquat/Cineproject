const { v4 } = require('uuid');
const { insertSession } = require("../../repository/movieSession/insertSession.js");

exports.addSession = async (req, res) => {
    try{
        const movieSessionId = v4();
        
        await insertSession(movieSessionId, req.body);
        res.status(201).json({message: "séance créée avec succès"});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}