import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import DisplayMovie from '../../components/Movies/DisplayMovie';
import { fetchMovieData } from '../../features/moviesManagement/api';
import { fetchSession } from '../../features/movieSession/api';
import MovieForm from '../../components/Movies/MovieManagerForm';
import ModalContainer from '../../components/Modals/ModalContainer';

function MovieDetail() {
    const movieId= useParams().id;
    
    const [movie, setMovie] = useState({});
    const [movieSessions, setMovieSessions] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    
    async function getMovieAndSessions() {
        const retrievedMovie = await fetchMovieData(movieId);
        if (!retrievedMovie) {
            setErrorMsg(['aucun film ne correspond à la recherche']);
            console.error('no movie');
            return;
        }
        setMovie(retrievedMovie);
        
        const retrievedSessions = await fetchSession(movieId);
        setMovieSessions(retrievedSessions);
    }
    useEffect(() => {
        getMovieAndSessions();
    }, [])
    console.log(movie)
    return(
        <main className="backOfficeMain">
            {errorMsg.length > 0 && errorMsg.map((c, i) => {
                return (<p key={i}>{c}</p>);
            })}
            
            
            {errorMsg.length === 0 && Object.keys(movie).length > 0 && (
                <>
                    <div className="managementBtnContainer">
                        <button className="backofficeBtn" type="button" onClick={() => setIsUpdating(true)}>Modifier</button>
                        <button className="backofficeBtn" type="button">Supprimer</button>
                    </div>
                    <DisplayMovie movie={movie} sessions={movieSessions} />
                </>
            )
                
            }
            {isUpdating && (
                <ModalContainer close={() => setIsUpdating(false)}>
                        <MovieForm update={true} previousMovieData={movie} idMovie={movieId} previousSessionsData={movieSessions} />
                </ModalContainer>)}
        </main>
        );
}
export default MovieDetail