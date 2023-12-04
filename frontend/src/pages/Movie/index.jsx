import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import fetchData from '../../features/moviesManagement/fetchAndFormat.js';
import DisplayMovie from '../../components/Movies/DisplayMovie';


function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    const [sessions, setSessions] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    
    async function setData() {
        const data = await fetchData(idMovie, setErrorMsg);
        setMovie(data.movie);
        setSessions(data.sessions);
    }
    
    useEffect(() => {
            setData()
    }, []);

    return (
        <main>
            {errorMsg.length === 0 ? 
            <DisplayMovie movie={movie} sessions={sessions} /> 
            : 
            (<p>{errorMsg[0]}</p>)}
            
        </main>
    );
}
export default Movie;
