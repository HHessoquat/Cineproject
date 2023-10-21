const { modifyRoom } = require('../../repository/rooms/modifyRoom.js');
exports.updateRoom = (req, res) => {
    try {
        const { id } = req.params;
        const room= {...req.body};
        const result = modifyRoom(room, id);
        res.status(200).json({message: 'Room has been updated'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}