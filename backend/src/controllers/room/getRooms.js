const {retrieveAllRooms, retrieveOneRoom} = require("../../repository/rooms/retrieveRooms");
exports.getAllRooms = async (req, res) => {
    try {
        const result = await retrieveAllRooms();
        res.status(200).json({
            message: "all room retrieved",
            content: result
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({message:'Server Error'});
    }
};
exports.getOneRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await retrieveOneRoom(id);
        res.status(200).json({result});
    }catch (err) {
        console.log(err);
        res.status(500).json({message:'Server Error'});
    }
};