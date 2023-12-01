export function dateToStringWDM(date) {
    return new Date(date).toLocaleString('fr-FR', {  weekday: 'long', month: 'long', day: 'numeric', });
}

export function dateToStringDMY(date) {
    return new Date(date).toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' });
}