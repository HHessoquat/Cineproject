const { removeSession, removeMovieSessions } = require('../../repository/movieSession/deleteSession.js')
exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        
        await removeSession(id);
        res.status(200).json({message: 'séance supprimée avec succès'});
    }
    catch (err) {
        res.status(500).json({message: 'server Error'});
    }
}

exports.deleteMovieSessions = async (req, res) => {
    try{
        const { movieId } = req.params;
        
        await removeMovieSessions(movieId);
        
        res.status(200).json({message: 'done'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'})
    }
}