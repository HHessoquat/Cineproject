import {useState, useEffect} from 'react';
import { useParams} from "react-router-dom";
import { fetchEventMovie } from '../../features/moviesManagement/api.js';
import MovieSlider from '../../components/Sliders/MovieSlider';
import DisplayMovie from '../../components/Movies/DisplayMovie';

function Events() {
    const { event } = useParams();
    const [movie, setMovie] = useState({});
    const [allSessions, setAllSessions] = useState([]);
    

    
    function setPageContent() {
        if (event === "wednesday") {
            return {header : 'Le Mercredi des enfants', eventDescription: 'Tous les mecredis après-midi, un film jeunesse à savourer en famille'};
        }else if (event === 'friday') {
            return {header : 'Les Vendredi cultes', eventDescription: "Tous les vendredis, retrouvez les films qui ont fait l'histoire du cinéma"};
        }else if (event === 'premiere') {
            return {header: 'avant-première', eventDescription: "Le CinéProject propose régulièrement des films en avant-première"};
        } else {
            return null;
        }
    }
    const pageContent = setPageContent();

    async function getMovie() {
        const retrievedMovie = await fetchEventMovie(event);
        const formatedMovie = retrievedMovie.map((c) => {
            const currentMovie = formatData(c);
            return currentMovie
        });
        setMovie(formatedMovie[0]);
        setAllSessions(formatedMovie);
    } 
    
    function formatData(movie) {
        const movieCopy = {...movie}
        const date = new Date(movie.date).toLocaleString('fr-FR', {  weekday: 'long', month: 'long', day: 'numeric', });
        const time = movie.time.substring(0, 5);
        const releaseDate = new Date(movie.releaseDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', })
        const seatsArray = JSON.parse(movie.seatsDisplay);
        movieCopy.seatsDisplay = seatsArray
        movieCopy.date= date;
        movieCopy.time = time;
        movieCopy.releaseDate = releaseDate
        return movieCopy;
    }
    
    useEffect(()=>{
        getMovie()
    }, []);

    return(
        <main id="eventPageMain">
            <section id="eventDescription" >
                <h2>{pageContent.header}</h2>
                <p>{pageContent.eventDescription}</p>
            </section>
            
            <DisplayMovie movie={movie} sessions={allSessions} />
            
            <section className="eventSessionSlider" >
                <h3>La programation</h3>
                <MovieSlider movieRow={allSessions} />
            </section>
        </main>
    )
}

export default Events;
