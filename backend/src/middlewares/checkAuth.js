const {retrieveOneById} = require ('../repository/user/retrieveUsers.js');

exports.checkAuthentication = (req, res, next) => {
    
    if(!req.session.isLogged) {
        console.log('ok');
        next();
        return;
    }
    
    res.status(401).json({message:'unauthorized request', content: ["Vous devez être connecté pour faire cette requête"]});
    
}

exports.checkAdmin = async (req, res, next) => {
    try {
        
        const user= await retrieveOneById(req.session.userId);
        
        if(!req.session.isLogged && user[0].role === 'admin')  {
            
            console.log('ok');
            next();
            return;
        }
    
        res.status(401).json({message:'unauthorized request', content: ["Vous n'avez pas l'autorisation pour cette action"]});
    }catch (err) {
        res.status(500).json({message: 'server error', content: ["la requête n'a pas pu être menée à son terme"]});
    }
}

exports.checkModerator = async (req, res, next) => {
    try {
        const user = await retrieveOneById(req.session.userId);
        
        if(req.session.isLogged && (user[0].role === 'moderator' || user[0].role === 'admin')) {
            
            console.log('ok');
            next();
            return;
        }
    
        res.status(401).json({message:'unauthorized request', content: ["Vous n'avez pas l'autorisation pour cette action"]});
    }catch (err) {
        res.status(500).json({message: 'server error', content: ["la requête n'a pas pu être menée à son terme"]});
    }
}