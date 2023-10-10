import { Link } from 'react-router-dom';
function MovieCard({movie}) {

    return (
        <>
            <article className="movieCard">
                <Link to={`/film/${movie.id}`}>
                    <h2 className="movieCardHeader">{movie.title}</h2>
                    
                    <img
                        className="moviePoster"
                        src={movie.poster}
                        alt={movie.posterAlt}
                    />
                </Link>
            </article>
            </>
    );
}

export default MovieCard;
