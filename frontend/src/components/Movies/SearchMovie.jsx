import { useState, useEffect } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import PrintAllMovies from './PrintAllMovies.jsx';
import MovieCard from './MovieCard';
import MovieManagerForm from './MovieManagerForm';
import { fetchMoviesData, deleteMovie, getMovieByTitle } from '../../features/moviesManagement/api.js';
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
        setNoMovie(false);
        const movies = await fetchMoviesData();
        if (movies === []) {
            setNoMovie(true);
            return
        }
        
        setAllMovies(movies);
    }
    
    async function handleDelete(id) {
        await deleteMovie(id);
        getAll()
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        setNoMovie(false);
        setAllMovies([])
        

        const retrievedMovie = await getMovieByTitle(movieSeeked.title);
        if (retrievedMovie === null) {
            setNoMovie(true);
            return
        }
        
        setMovie(retrievedMovie[0]);
    }
    console.log(allMovies)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label>
                        title :
                        <input type="text" id="title" name="title" value={movieSeeked.named} onChange={(e) => handleChange(e, setMovieSeeked, setErrorMsg)} />
                    </label>
                </div>

                <input type="submit" value="chercher" />
            </form>
            <button type="button" onClick={getAll}> afficher tout les films </button>
            
            {noMovie && <p>aucun film n'a été trouvé</p>}
            
            {!noMovie && allMovies[0] 
                && <PrintAllMovies 
                        movies={allMovies}
                        setAllMovies={setAllMovies} 
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
                    <button type="button" onClick={() => setUpdate(true)}>Modifier</button>
                    
                </>
            )
                
            }
            {update && movie.title && <MovieManagerForm update={update} previousMovieData={movie} idMovie={movie.id} previousSessionsData={sessionsData}  />}
            
        </>
        )
}

export default SearchMovie