import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        {Object.keys(movies).length > 0 && movies.regularSessions && (
            <>
                <h2>A l'affiche</h2>
                <MovieSlider movieRow={movies.regularSessions} />
            </>
        )}
        {Object.keys(movies).length > 0 && movies.movieToCome && (
            <>
                <h2>A venir</h2>
                <MovieSlider movieRow={movies.movieToCome} />
            </>
        )}
        {Object.keys(movies).length > 0 && movies.premiereSessions && (
            <>
                <h2>Les avants-premières</h2>
                <MovieSlider movieRow={movies.premiereSessions} />
            </>
        )}
        {Object.keys(movies).length > 0 && movies.wednesdaySessions && (
            <>
                <h2>Le mercredi des enfants</h2>
                <MovieSlider movieRow={movies.wednesdaySessions} />
            </>
        )}
        {Object.keys(movies).length > 0 && movies.friday && (
            <>
                <h2>Les vendredi cultes</h2>
                <MovieSlider movieRow={movies.friday} />
            </>
        )}
        </main>
        
        )
        
}
export default Home;
