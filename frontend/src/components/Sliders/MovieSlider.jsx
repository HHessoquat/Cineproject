import MovieCard from '../Movies/MovieCard';
function MovieSlider({movieRow}) {
    console.log(movieRow);
    return(
        <section className='movieRow'>
            {movieRow.map((c, i) => {
            console.log(c);
                return (
                    <article>
                        <MovieCard movie={c} />
                    </article>
                )
                
            })}
        </section>
        )
}
export default MovieSlider