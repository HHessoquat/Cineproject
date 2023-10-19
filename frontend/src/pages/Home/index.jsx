import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsSlider from './EventsSlider.jsx';
import { fetchOnlineMoviesdata } from '../../features/moviesManagement/api.js';

function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchOnlineMoviesdata(setMovies);
    }, []);
    return (
        <EventsSlider movies={movies}/>
        )
}
export default Home;
