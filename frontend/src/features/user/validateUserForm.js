export function validateLogin(formData) {
    
        if (!formData.pseudo || !formData.password) {
            return ['tout les champs sont obligatoire'];
        }
        else return [];
    }
    
export function validateSignIn(user) {
    const errors = [];
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!user.name || !user.firstName) {
        errors.push('Vous devez indiquer un nom et un prénom');
    }
    if (!user.pseudo) {
        errors.push("le pseudo est nécessaire à la création d'un compte");
    }
    if (!emailRegex.test(user.email)) {
        errors.push("vous devez indiquez une adresse mail valide");
    }
    if (!user.password) {
        errors.push("le mot de passe est nécessaire à la création du compte");
    }
    if (!user.role) {
        user.role = "user";
    }
    return errors;
}

export function validateFetchUser(pseudo) {
    if (!pseudo) {
        return ["vous devez indiquer le pseudo de l'utilisateur recherché"];
    }
    return [];
}