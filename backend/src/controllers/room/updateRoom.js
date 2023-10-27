const { modifyRoom } = require('../../repository/rooms/modifyRoom.js');
exports.updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room= {...req.body};
        await modifyRoom(room, id);
        res.status(200).json({message: 'Room has been updated'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}