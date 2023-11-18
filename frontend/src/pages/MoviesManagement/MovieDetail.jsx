import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { AuthentificationContext } from '../../utils/context';
import DisplayMovie from '../../components/Movies/DisplayMovie';
import MovieForm from '../../components/Movies/MovieManagerForm';
import ModalContainer from '../../components/Modals/ModalContainer';
import Unauthorized from '../Errors/Unauthorized';
import Forbidden from '../Errors/Forbidden';
import { fetchMovieData, deleteMovie } from '../../features/moviesManagement/api';
import { fetchSession } from '../../features/movieSession/api';

function MovieDetail() {
    const movieId= useParams().id;
    const {isLogged, role} = useContext(AuthentificationContext);
    const [movie, setMovie] = useState({});
    const [movieSessions, setMovieSessions] = useState([]);
    const [update, setUpdate] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    const navigate = useNavigate();
    
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


    async function handleDelete() {
        const hasError = await deleteMovie(movieId);
        if (hasError) {
            setErrorMsg(hasError);
            return;
        }
        navigate("/admin/home")
    }
    
    
    return(
        <>
            {!isLogged && <Unauthorized />}
            {isLogged && role !== "admin" && role !== "moderator" && <Forbidden />}
            
            {(isLogged && (role === "admin" || role === "moderator")) && (
                <main className="backOfficeMain">
                    {errorMsg.length > 0 && errorMsg.map((c, i) => {
                        return (<p key={i}>{c}</p>);
                    })}
                    
                    
                    {errorMsg.length === 0 && Object.keys(movie).length > 0 && (
                        <>
                            <div className="managementBtnContainer">
                                <button className="backofficeBtn" type="button" onClick={() => setUpdate(true)}>Modifier</button>
                                <button className="backofficeBtn" type="button" onClick={handleDelete}>Supprimer</button>
                            </div>
                            <DisplayMovie movie={movie} sessions={movieSessions} />
                        </>
                    )
                        
                    }
                    {update && (
                        <ModalContainer close={() => setUpdate(false)}>
                                <MovieForm 
                                    update={update}
                                    setUpdate= {setUpdate}
                                    previousMovieData={movie}
                                    idMovie={movieId}
                                    previousSessionsData={movieSessions} />
                        </ModalContainer>)}
                </main>
            )}
        </>
        );
}
export default MovieDetail