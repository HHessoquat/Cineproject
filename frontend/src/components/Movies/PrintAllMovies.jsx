import MovieCard from './MovieCard';
function PrintAllMovies({movies}) {
    return (
        <>
            {movies.map(movie => (<MovieCard key={movie.id} movie={movie} />))}
        </>
        );
}

export default PrintAllMovies