async function formatData(req, res, next) {
    try {
        
        const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!req.body.name) {
            throw new Error("l'utiliteur doit avoir un nom");
        }
        if (!req.body.firstName) {
            throw new Error("l'utiliteur doit avoir un prénom");
        }
        if (!req.body.email || !mailRegex.test(req.body.email)) {
            throw new Error('une adresse mail valide est requise');
        }
        if (!req.body.pseudo) {
            throw new Error('Un pseudo est nécessaire pour créer un compte');
        }
        if (!req.body.password) {
            throw new Error('Un mot de passe est nécessaire');
        }
        if (!req.body.role) {
            req.body.role= "user";
        }
        next();
    }catch (err) {
        console.log(err);
        res.status(400).json({error: err, message: 'echec de la creation du compte'});
    }
    
}
module.exports = formatData;