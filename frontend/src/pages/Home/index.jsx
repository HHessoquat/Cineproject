import { useState, useEffect } from 'react';
import EventsSlider from '../../components/Sliders/EventsSlider.jsx';
import MovieSlider from '../../components/Sliders/MovieSlider';
import { fetchOnlineMoviesdata } from '../../features/moviesManagement/api.js';
import { parseDate } from '../../utils/dateFormat/parseDate.js';

function Home() {
    const [movies, setMovies] = useState({});
    
    function formatDates(moviesObject) {
        const newMovies = {};
        
        for (let key in moviesObject) {
            newMovies[key] = moviesObject[key].map((c) => {
                if (c.sessions) {
                    const movie = { ...c };
                    const sessionsArray = movie.sessions.split(', ');
                    const sessionsDate = sessionsArray.map((current) => parseDate(current));
                    movie.sessions = sessionsDate;
                    return movie;
                }
                return c;
                
            });
        }
        
        setMovies(newMovies);
    }
    
    async function fetchMoviesAndFormatDate() {
        const retrievedMovies = await fetchOnlineMoviesdata();
        formatDates(retrievedMovies);
        
    }
    
    useEffect(() => {
        fetchMoviesAndFormatDate()
    }, []);
    console.log(movies)
    return (
        <main>
        
        {Object.keys(movies).length > 0 && <EventsSlider movies={movies} />}
        
        {Object.keys(movies).length > 0 && movies.regularSessions.length > 0 && (
                <MovieSlider movieRow={movies.regularSessions} header={"A l'affiche"} />
        )}
        {Object.keys(movies).length > 0 && movies.movieToCome.length > 0 && (
                <MovieSlider movieRow={movies.movieToCome} header={'A venir'} />
        )}
        {Object.keys(movies).length > 0 && movies.premiereSessions.length > 0 && (
                <MovieSlider movieRow={movies.premiereSessions} header={'Les avants-premières'} />
        )}
        {Object.keys(movies).length > 0 && movies.wednesdaySessions.length > 0 && (
                <MovieSlider movieRow={movies.wednesdaySessions} header={'Le mercredi des enfants'} />
        )}
        {Object.keys(movies).length > 0 && movies.fridaySessions.length > 0 && (
                <MovieSlider movieRow={movies.fridaySessions} header={'Les vendredi cultes'} />
        )}
        </main>
        
        )
        
}
export default Home;
