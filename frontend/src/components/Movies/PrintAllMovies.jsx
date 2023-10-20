import MovieCard from './MovieCard';
function PrintAllMovies({movies, getOne}) {
    return (
        <>
            {movies.map(movie => (
                <article>
                    <MovieCard key={movie.id} movie={movie} isInBackOffice={true} />
                    <button type="button" onClick={(e) => getOne(e, movie.title)}>Détail</button>
                </article>
                ))}

        </>
        );
}

export default PrintAllMovies