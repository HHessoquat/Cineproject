import { Link } from 'react-router-dom';
function MovieCard({movie, isInBackOffice, handleDelete}) {
    console.log('passe')
    function content() {
        return (
            <>
                <h2 className="movieCardHeader">{movie.title}</h2>
                <img
                    className="moviePoster"
                    src={movie.poster}
                    alt={movie.posterAlt}
                />
            </>
        );
}
    return (
        <>
            <article className="movieCard">
                {!isInBackOffice ? (
                    <Link to={`/film/${movie.id}`}> 
                        {content()}
                    </Link>)
                    : content()}
            </article>
            </>
    );
}

export default MovieCard;
