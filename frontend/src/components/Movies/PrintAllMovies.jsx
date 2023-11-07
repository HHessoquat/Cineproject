import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
function PrintAllMovies({movies, getOne, handleDelete}) {

    return (
        <>
            {movies.map(movie => (
                <article key={movie.id}>
                    <MovieCard  movie={movie} isInBackOffice={true} />
                    <Link to={`/admin/movie/${movie.id}`} className="backofficeBtn">Détail</Link>
                    <button className="backofficeBtn" type="button" onClick={() => handleDelete(movie.id)} >Supprimer</button>
                </article>
                ))}

        </>
        );
}

export default PrintAllMovies