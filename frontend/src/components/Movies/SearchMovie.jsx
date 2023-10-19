import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import PrintAllMovies from './PrintAllMovies.jsx';
import MovieCard from './MovieCard';
import { fetchMoviesData, deleteMovie, getMovieByTitle } from '../../features/moviesManagement/api.js';

function SearchMovie({allMovies, setAllMovies, movie, setMovie}) {
    const [movieSeeked, setMovieSeeked] = useState({
        titled: '',
    });
    const [noMovie, setNoMovie] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);

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
            
            {!noMovie && allMovies[0] && <PrintAllMovies 
                                            movies={allMovies}
                                            setAllMovies={setAllMovies} 
                                            getAll={getAll} 
                                            handleDelete= {handleDelete}
                                        /> }
            
            {!noMovie && movie.title && <MovieCard 
                                        movie={movie}
                                        isInBackOffice={true}
                                        handleDelete= {handleDelete}
                                    />}
        </>
        )
}

export default SearchMovie