import { useState, useEffect } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import PrintAllMovies from './PrintAllMovies.jsx';
import MovieCard from './MovieCard';
import MovieManagerForm from './MovieManagerForm';
import ModalContainer from '../Modals/ModalContainer';
import { fetchMoviesData, deleteMovie, getMovieByTitle } from '../../features/moviesManagement/api.js';
import { validateSearchForm } from '../../features/moviesManagement/validateMovieForm.js';
import { fetchSession } from '../../features/movieSession/api.js';

function SearchMovie({allMovies, setAllMovies, movie, setMovie}) {
    const [movieSeeked, setMovieSeeked] = useState({
        titled: '',
    });
    const [update, setUpdate] = useState(false)
    const [noMovie, setNoMovie] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    const [sessionsData, setSessionsData] = useState([])
    
    async function getSessions() {
        const sessions = await fetchSession(movie.id);
        setSessionsData(sessions)
    }
    
    useEffect(()=> {
        if (movie) {
            getSessions()
        }
    }, [movie])

    async function getAll() {
        setMovie({});
        setNoMovie(false);
        const movies = await fetchMoviesData();
        if (movies === []) {
            setNoMovie(true);
            return
        }
        
        setAllMovies(movies);
    }
    
    async function handleDelete(id) {
        const hasError = await deleteMovie(id);
        if (hasError) {
            setErrorMsg([hasError]);
        }
        await getAll()
    }
    
    async function getOne(e, title) {
        
        const retrievedMovie = await getMovieByTitle(title);
        if (retrievedMovie === null) {
            setNoMovie(true);
            return
        }
        
        setMovie(retrievedMovie[0]);
    }
    async function handleSubmit(e, title) {
        e.preventDefault();
        setNoMovie(false);
        setAllMovies([]);
        
        const errors = validateSearchForm(title);
        if (errors.length > 0) {
            setErrorMsg(errors);
            return;
        }
        
        await getOne(e, title);   
    }

    return (
        <>
            <form className="backofficeForm" onSubmit={(e) => handleSubmit(e, movieSeeked.title)}>
                <div className="inputContainer">
                    <label className="searchInput">
                        titre
                        <input type="text" id="title" name="title" value={movieSeeked.named} onChange={(e) => handleChange(e, setMovieSeeked, setErrorMsg)} />
                    </label>
                </div>

                <input className="backofficeBtn backofficeFormBtn" type="submit" value="chercher" />
                <button className="backofficeBtn backofficeFormBtn" type="button" onClick={getAll}> afficher tous les films </button>
            </form>
            
            {noMovie && <p>aucun film n'a été trouvé</p>}
            {errorMsg && errorMsg.map((c) => (<p>{c}</p>))}
            
            {!noMovie && errorMsg.length === 0 && !movie.title && allMovies[0] 
                && <PrintAllMovies 
                        movies={allMovies}
                        getOne={getOne} 
                        getAll={getAll} 
                        handleDelete= {handleDelete}
                    /> }
            
            {!noMovie && movie.title && (
                <>
                    <MovieCard 
                            movie={movie}
                            isInBackOffice={true}
                            handleDelete= {handleDelete}
                        />
                    <button className="backofficeBtn" type="button" onClick={() => setUpdate(true)}>Modifier</button>
                    
                </>
            )
                
            }
            {update && movie.title && (
            <ModalContainer close={() => setUpdate(false)} >
                <MovieManagerForm update={update} previousMovieData={movie} idMovie={movie.id} previousSessionsData={sessionsData} />
            </ModalContainer>
            )}
            
        </>
        )
}

export default SearchMovie