function validateForm(formData) {
    let updateErrorMsg = [];
    if (!formData.movieTitle) {
        updateErrorMsg.push(`Le titre du film est obligatoire`);
    }
    if (!formData.posterFile) {
        updateErrorMsg.push(`Vous devez ajouter une affiche pour le film`);
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

    return updateErrorMsg;
}

export default validateForm;