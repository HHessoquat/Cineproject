const getUsers = require('../../repository/user/retrieveUsers');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await getUsers.retrieveAll();
        if (result.length === 0) {
            res.status(404).json({message: "no user found", content: null});
            return
        }
        res.status(200).json({message: 'users retrieved', content: result});
        
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}

exports.getUSerById = async (req, res) => {
    try {
        const {id} = req.params;
        const result = getUsers.retrieveOneById(id)
        if (result.length === 0) {
            res.status(404).json({message: "no user found", content: null});
            return
        }
        res.status(200).json({message:'userRetrieved', content : result})
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}

exports.getUserByPseudo = async (req, res) => {
    try {
        const { pseudo } = req.params;
        const result = await getUsers.retrieveOneByPseudo(pseudo);
        if (result.length === 0) {
            res.status(404).json({message: "no user found", content: null});
            return
        }
        res.status(200).json({message: 'fetch handled', content: result});
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'server Error'});
    }
}