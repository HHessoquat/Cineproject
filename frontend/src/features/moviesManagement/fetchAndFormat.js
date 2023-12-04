import { fetchMovieData} from './api.js';
import formatMovieData from './formatMovieData.js';
import formatSessionData from '../movieSession/formatSessionData.js';
import { fetchSession } from '../movieSession/api.js';

async function formatMovieAndSession(movie, sessions) {
    const newMovie = formatMovieData(movie);
    const newSessions = formatSessionData(sessions);

    return({movie: newMovie, sessions: newSessions, originalMovie : movie, originalSessions: sessions});

}

async function fetchAndFormat(idMovie, setErrorMsg) {
        const movieResult = await fetchMovieData(idMovie);
        console.log(movieResult);
            if ('ok' in movieResult && movieResult.ok === false) {
                setErrorMsg(["Aucun film ne correspond à la recherche"]);
                console.error("404 :","no movie")
                return;
            }
        const sessionResult = await fetchSession(movieResult.id);
        const formatedData = await formatMovieAndSession(movieResult, sessionResult);
        return {movie : formatedData.movie, sessions: formatedData.sessions};

}

export async function fetchOriginalAndFormatedData(idMovie, setErrorMsg){
    const movieResult = await fetchMovieData(idMovie);

        if ('ok' in movieResult && movieResult.ok === false) {
            setErrorMsg(["Aucun film ne correspond à la recherche"]);
            console.error("404 :","no movie")
            return;
        }
    const sessionResult = await fetchSession(movieResult.id);
    const allData = await formatMovieAndSession(movieResult, sessionResult);
    return allData;
}

export default fetchAndFormat;