import { movie } from '../../assets/Movies';
function MovieCard() {
    return (
        <>
            <article className="movieCard">
                <h2 className="movieCardHeader">{movie.title}</h2>
                <img
                    className="moviePoster"
                    src={movie.poster}
                    alt={movie.posterAlt}
                />
            </article>
        </>
    );
}

export default MovieCard;
