function validateForm(formData, update) {
    let updateErrorMsg = [];
    console.log(formData)
    if (!formData.movieTitle) {
        updateErrorMsg.push(`Le titre du film est obligatoire`);
    }
    if (!formData.posterFile && !update) {
        updateErrorMsg.push(`Vous devez ajouter une affiche pour le film`);
    }
    if (!formData.coverImgFile && !update) {
        updateErrorMsg.push(`Vous devez ajouter une image de couverture pour le film`);
    }
    if (!formData.posterAlt) {
        updateErrorMsg.push(
            `l'affiche du film doit avoir un texte alternatif qui s'affichera en cas de problème avec le chargement de l'image`
        );
    }
    if (!formData.trailerFile && !formData.trailerUrl) {
        updateErrorMsg.push(`Le film doit avoir une bande-annonce`);
    }
    if (formData.categories.length === 0) {
        updateErrorMsg.push(`Le film doit avoir au moins une catégorie`);
    }

    if (isNaN(Number(formData.movieLength))) {
        updateErrorMsg.push('La durée du film doit être un nombre');
    }
    
    if (formData.isOnline !== 0 && formData.isOnline !== 1) {
        updateErrorMsg.push('Vous devez indiquez si le film doit être mis en ligne ou non');
    }

    return updateErrorMsg;
}

export default validateForm;