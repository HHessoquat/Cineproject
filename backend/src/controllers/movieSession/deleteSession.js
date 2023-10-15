const { removeSession } = require('../../repository/movieSession/deleteSession.js')
exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await removeSession(id);
        console.log(result);
        res.status(200).json({message: 'séance supprimée avec succès'});
    }
    catch (err) {
        res.status(500).json({message: 'server Error'});
    }
}