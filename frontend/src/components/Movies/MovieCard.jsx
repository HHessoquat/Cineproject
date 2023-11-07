import { Link } from 'react-router-dom';

function MovieCard({movie, isInBackOffice, handleDelete}) {
    
    function content() {
        return (
            <>
                <img
                    className="moviePoster"
                    src={movie.poster}
                    alt={movie.posterAlt}
                />
                <h3 className="movieCardHeader">{movie.title}</h3>
            </>
        );
}
    return (
        <>
            <article className="movieCard">
                {!isInBackOffice ? (
                    <Link to={`/film/${movie.id}`} style={{textDecoration: 'none'}}> 
                        {content()
                            }
                    </Link>)
                    : content()}
            </article>
            </>
    );
}

export default MovieCard;
