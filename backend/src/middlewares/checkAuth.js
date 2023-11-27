const {retrieveOneById} = require ('../repository/user/retrieveUsers.js');

exports.checkAuthentication = (req, res, next) => {
    
    if(!req.session.isLogged) {
        console.log('ok');
        next();
        return;
    }
    
    res.status(401).json({error:'unauthorized request', message: ["Vous devez être connecté pour faire cette requête"]});
    
}

exports.checkAdmin = async (req, res, next) => {
    try {
        const user= await retrieveOneById(req.session.userId);

        if(req.session.isLogged && user[0].role === 'admin')  {
            
            console.log('ok');
            next();
            return;
        }else if (req.session.isLogged) {
            res.status(403).json({error:'unauthorized request', message: "Vous n'avez pas l'authorisation pour affectuer cette action"});
            return;
        }
        res.status(401).json({error:'unauthorized request', message: "Vous devez être connecté pour faire cette action"});
    }catch (err) {
        res.status(500).json({error: 'server error', message: "la requête n'a pas pu être menée à son terme"});
    }
}

exports.checkModerator = async (req, res, next) => {
    try {
        const user = await retrieveOneById(req.session.userId);
        
        if(req.session.isLogged && (user[0].role === 'moderator' || user[0].role === 'admin')) {
            
            console.log('ok');
            next();
            return;
        }else if (req.session.isLogged) {
            res.status(401).json({error:'unauthorized request', message: "Vous n'avez pas l'authorisation pour affectuer cette action"});
            return;
        }
        res.status(401).json({error:'unauthorized request', message: "Vous devez être connecté pour faire cette action"});
    }catch (err) {
        res.status(500).json({error: 'server error', message: "la requête n'a pas pu être menée à son terme"});
    }
}