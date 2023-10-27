const removeRoom = require('../../repository/rooms/deleteRoom.js').deleteRoom;
exports.deleteRoom = async (req, res) => {
    try{
        const { id } = req.params;
        
        await removeRoom(id);
        res.status(200).json({message: 'salle supprimée avec succès'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}