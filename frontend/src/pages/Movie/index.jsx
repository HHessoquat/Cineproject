import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import { fetchMovieData, deleteMovie } from '../../features/moviesManagement/api.js'

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            const result = await fetchMovieData(idMovie);
            
            setMovie(result);
            }
            fetchData();
    }
        , []);
        
    return (
        <>
            <h1 id="moviePage_title">{movie.title}</h1>
            <article className="movieDescription">
                <img
                    className="moviePoster"
                    src={movie.poster}
                    alt={movie.posterAlt}
                />
                <aside id="movie_info">
                    <ul>
                        <li>durée : {movie.length} minutes</li>
                        <li>De {}</li>
                        <li>Avec {movie.actors}</li>
                        <li>
                            Date de sortie :
                        </li>
                    </ul>
                </aside>
                <button type='button' onClick={() => deleteMovie(idMovie)}>Supprimer</button>
            </article>
        </>
    );
}
export default Movie;
