import MovieForm from './MovieManagerForm.jsx';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { fetchMovieDatas } from '../../features/moviesManagement/api.js';
import { fetchSession } from '../../features/movieSession/api.js';

function UpdateMovie() {
    const [movieData, setMovieData] = useState();
    const [sessions, setSessions] = useState([]);
    const {idMovie} = useParams();
    
    useEffect(()=>{
        async function fetchMovie() {
                try {
                    const retrievedMovie = await fetchMovieDatas(idMovie);
                    setMovieData(retrievedMovie);
                } catch (error) {
                    console.log(error);
                    }
                }
                
        async function fetchSessionDatas() {
            try {
                const retrievedSessions = await fetchSession(idMovie);
                
                setSessions(retrievedSessions);
                console.log(retrievedSessions);
            } catch (err) {
                console.log(err)
            }
        }        
        fetchMovie();
        fetchSessionDatas();
    }, []);
    
    // console.log(movieData);
    return(
            <MovieForm update={true} previousMovieData={movieData} idMovie={idMovie} previousSessionsData={sessions} />
        )
}
export default UpdateMovie;