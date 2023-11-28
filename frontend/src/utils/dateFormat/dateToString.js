function dateTostring(date) {
    return new Date(date).toLocaleString('fr-FR', {  weekday: 'long', month: 'long', day: 'numeric', });
}
export default dateTostring;