import { movie } from '../../assets/Movies';

function Movie() {
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
                        <li>De {movie.director}</li>
                        <li>Avec {movie.mainActors.map((c) => `${c}, `)}</li>
                        <li>
                            Date de sortie :{' '}
                            {`${movie.releaseDate.toLocaleDateString('fr-FR')}`}
                        </li>
                    </ul>
                </aside>
            </article>
        </>
    );
}
export default Movie;
