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
    
    
    console.log(movies.regularSessions)
    
    return (
        <main>
        
        {Object.keys(movies).length > 0 && <EventsSlider movies={movies} />}
        {Object.keys(movies).length > 0 && movies.regularSessions && <MovieSlider movieRow={movies.regularSessions} />}
        </main>
        
        )
        
}
export default Home;
