import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import { fetchMovieDatas, deleteMovie } from '../../features/moviesManagement/api.js'

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    
    useEffect(() => {
            fetchMovieDatas(idMovie, setMovie);
            }
        , []);
        console.log(movie)
    
        
    
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
                        <li>Avec {}</li>
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
