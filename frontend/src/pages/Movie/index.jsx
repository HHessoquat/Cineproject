import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import { fetchMovieData} from '../../features/moviesManagement/api.js';
import { fetchSession } from '../../features/movieSession/api.js';
import DisplayMovie from '../../components/Movies/DisplayMovie';

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    const [sessions, setSessions] = useState([]);
    
    
    async function fetchData() {
        const movieResult = await fetchMovieData(idMovie);
        const newMovie = formatMovieData(movieResult);
        setMovie(newMovie);
        
        const sessionResult = await fetchSession(newMovie.id);
        const newSessions = formatSessionData(sessionResult);
        setSessions(newSessions);
        }
        
    function formatMovieData(data) {
        const dataCopy = {...data}
        const releaseDate = new Date(data.releaseDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', });
        dataCopy.releaseDate= releaseDate;
            return dataCopy;
    }
    function formatSessionData(allSessions){
        const dataCopy  = [...allSessions];
        const formattedData = dataCopy.map((c) => {
            c.date = new Date(c.date).toLocaleString('fr-FR', {  weekday: 'long', month: 'long', day: 'numeric', });
            c.time = c.time.substring(0, 5);
            return c;
        });
        return formattedData;
    }
    
    
    useEffect(() => {
            fetchData();
    }, []);
    
    return (
        <main>
        <DisplayMovie movie={movie} sessions={sessions} />
        </main>
    );
}
export default Movie;
