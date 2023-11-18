const checkSeatMap = require('./checkSeatMap.js');
function formatSessionData(req, res, next) {
    try {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/
        
        
        if (!req.body.date || !dateRegex.test(req.body.date)) {
            throw new Error("la date n'est pas valide");
        }
        
        if (!req.body.time || !timeRegex.test(req.body.time)) {
            throw new Error("l'heure n'est pas valide");
        }
        
        if (!req.body.seatMap && !checkSeatMap(req.body.seatMap, 'boolean')) {
            throw new Error('une salle doit être associée à la séance');
        } else {
            req.body.seatMap = JSON.stringify(req.body.seatMap);
        }
        
        if (!req.body.idRoom) {
            throw new Error("Une erreur est survenue pendant l'enregistrement de la séance, veuillez réessayez plus tard");
        }
        next()
        
    }catch (err) {
        console.log(err);
        res.status(400).json({error: err});
    }
}

module.exports = formatSessionData