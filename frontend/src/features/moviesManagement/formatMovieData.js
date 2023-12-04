import { dateToStringDMY } from '../../utils/dateFormat/dateToString.js';

function formatMovieData(data) {
    const dataCopy = {...data}
    const releaseDate = dateToStringDMY(data.releaseDate);
    dataCopy.releaseDate= releaseDate;
    return dataCopy;
}
export default formatMovieData;