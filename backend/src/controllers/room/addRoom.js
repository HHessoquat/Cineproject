const { insertRoom } = require('../../repository/rooms/insertRoom.js');
exports.addRoom = async (req, res) => {
    try {
        const room= {...req.body};

        await insertRoom(room);
        res.status(201).json({message: 'ok'});
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}