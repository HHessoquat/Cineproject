function formatData(req, res, next) {
    try {
        req.body.nbSeats = Number(req.body.nbSeats);
    
        if (!req.body.name) {
            throw new Error('La salle doit avoir un nom');
        }
        if (!req.body.nbSeats || isNaN(req.body.nbSeats) || !req.body.seatsDisplay) {
            throw new Error('La salle doit avoir des sièges');
        }else {
            req.body.seatsDisplay = JSON.stringify(req.body.seatsDisplay);
        }
        next();
    }catch (err) {
        console.log(err);
        res.status(400).json({error: err});
    }
    
}
module.exports = formatData;