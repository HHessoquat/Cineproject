import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventsSlider from '../../components/Sliders/EventsSlider.jsx';
import { fetchOnlineMoviesdata } from '../../features/moviesManagement/api.js';

function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchOnlineMoviesdata(setMovies);
    }, []);
    return (
        <>
        {Object.keys(movies).length > 0 && <EventsSlider movies={movies}/>}
        </>
        )
        
}
export default Home;
