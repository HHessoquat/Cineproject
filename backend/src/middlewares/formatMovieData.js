
exports.validateAndFormatMovie = (req, res, next) => {
    try{
        req.body.movieLength = Number(req.body.movieLength);
        
        req.body.releaseDate = new Date(req.body.releaseDate).toISOString().slice(0, 19).replace('T', ' ');
                    //prevent xss attacks
    
        
        if (!req.body.movieTitle) {
            throw new Error(`Le titre du film est obligatoire`);
        }
        if (!req.body.director) {
            throw new Error(`Le film doit avoir au moins un réalisateur`);
        }
        if (!req.body.mainActors) {
            throw new Error(`Le film doit avoir au moins un acteur`);
        }

        if (!req.body.posterAlt) {
            throw new Error(
                `l'affiche du film doit avoir un texte alternatif qui s'affichera en cas de problème avec le chargement de l'image`
            );
        }
        
        if (!req.body.coverImgAlt) {
            throw new Error(
                `l'image de couverture doit avoir un texte alternatif qui s'affichera en cas de problème avec le chargement de l'image`
            );
        }
        
        if (req.body.categories.length === 0) {
            throw new Error(`Le film doit avoir au moins une catégorie`);
        }
    
        if (isNaN(Number(req.body.movieLength))) {
            throw new Error('La durée du film doit être un nombre');
        }
        if (req.body.isOnline != 0 && req.body.isOnline != 1) {
        throw new Error('Vous devez indiquez si le film doit être mis en ligne ou non');
    }
    
        next();
    }catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
}