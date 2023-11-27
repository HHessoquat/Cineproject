import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
function PrintAllMovies({movies, getOne, handleDelete}) {

    return (
        <div class="allMovieWrapper">
            {movies.map(movie => (
                <div key={movie.id}>
                    <MovieCard  movie={movie} isInBackOffice={true} />
                    
                    <div className="managementBtnContainer">
                        <Link to={`/admin/movie/${movie.id}`} className="backofficeBtn">Détail</Link>
                        <button className="backofficeBtn" type="button" onClick={() => handleDelete(movie.id)} >Supprimer</button>
                    </div>
                </div>
                ))}

        </div>
        );
}

export default PrintAllMovies