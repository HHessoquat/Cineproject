const getUser = require("../../repository/user/retrieveUsers.js").retrieveOneByPseudo;

const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try {
        const result = await getUser(req.body.pseudo);
        if (result.length === 0) {
            res.status(401).json({message: 'identifiants invalides', isLogged: null});
            return;
        }
        
      
        const isAuthorized = await bcrypt.compare(req.body.password, result[0].password);
        
        if (!isAuthorized) {
            res.status(401).json({message: 'identifiants invalides', isLogged: null});
            return;
        }
        req.session.isLogged= true;
        req.session.userId= result[0].id;
        
        res.status(200).json({message: 'connected', isLogged: true, content: result[0].id});
        
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'fail to connect due to server error', isLogged: false});
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                throw new Error(err);
            }
            console.log('logout')
            res.status(200).json({message: "you've been successfully logged out"});
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({message: 'server error, session still in progress'});
    }

        
}