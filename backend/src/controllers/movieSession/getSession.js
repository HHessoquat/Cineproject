const { retrieveSession } = require("../../repository/movieSession/retrieveSession.js");
exports.getSession = async (req, res) => {
    try {
        const { movieId } = req.params;
        const sessions = await retrieveSession(movieId);
        res.status(200).json({
            message: 'got sessions',
            content: sessions
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
    
}