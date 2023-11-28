import dateToString from '../../utils/dateFormat/dateToString.js';

function formatMovieData(data) {
    const dataCopy = {...data}
    const releaseDate = dateToString(data.releaseDate);
    dataCopy.releaseDate= releaseDate;
    
    return dataCopy;
}
export default formatMovieData;