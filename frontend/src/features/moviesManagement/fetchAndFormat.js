import { fetchMovieData} from './api.js';
import formatMovieData from './formatMovieData.js';
import formatSessionData from '../movieSession/formatSessionData.js';
import { fetchSession } from '../movieSession/api.js';

async function formatMovieAndSession(movie) {
    const newMovie = formatMovieData(movie);
    
    const sessionResult = await fetchSession(newMovie.id);
    
    const newSessions = formatSessionData(sessionResult);
    
    return({movie: newMovie, sessions: newSessions, originalMovie : movie, originalSessions: sessionResult});

}

async function fetchAndFormat(idMovie, setMovie, setSessions, setErrorMsg) {
        const movieResult = await fetchMovieData(idMovie);

        if ('ok' in movieResult && movieResult.ok === false) {
            setErrorMsg(["Aucun film ne correspond à la recherche"]);
            console.error("404 :","no movie")
            return;
        }
        const formatedData = formatMovieAndSession(movieResult);
        setMovie(formatedData.movie);
        setSessions(formatedData.sessions);
}

export async function fetchOriginalAndFormatedData(idMovie, setErrorMsg){
    const movieResult = await fetchMovieData(idMovie);

        if ('ok' in movieResult && movieResult.ok === false) {
            setErrorMsg(["Aucun film ne correspond à la recherche"]);
            console.error("404 :","no movie")
            return;
        }
        const allData = formatMovieAndSession(movieResult);
    return allData;
}

export default fetchAndFormat;