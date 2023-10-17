const getUsers = require('../../repository/user/retrieveUsers');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await getUsers.retrieveAll();
        console.log(result);
        res.status(200).json({message: 'users retrieved', content: result});
        
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}

exports.getUSerById = async (req, res) => {
    try {
        
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}

exports.getUserByPseudo = async (req, res) => {
    try {
        const { pseudo } = req.params;
        const result = await getUsers.retrieveOneByPseudo(pseudo);
        res.status(200).json({message: 'fetch handled', content: result});
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}