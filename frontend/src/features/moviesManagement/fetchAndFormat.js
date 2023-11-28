import { fetchMovieData} from './api.js';
import formatMovieData from './formatMovieData.js';
import formatSessionData from '../movieSession/formatSessionData.js';
import { fetchSession } from '../movieSession/api.js';

async function fetchAndFormat(idMovie, setMovie, setSessions, setErrorMsg) {
        const movieResult = await fetchMovieData(idMovie);

        if ('ok' in movieResult && movieResult.ok === false) {
            setErrorMsg(["Aucun film ne correspond à la recherche"]);
            console.error("404 :","no movie")
            return;
        }
        const newMovie = formatMovieData(movieResult);
        setMovie(newMovie);
        
        const sessionResult = await fetchSession(newMovie.id);
        const newSessions = formatSessionData(sessionResult);
        setSessions(newSessions);
}

export default fetchAndFormat;