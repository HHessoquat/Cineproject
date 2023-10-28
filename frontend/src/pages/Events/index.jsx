import {useState, useEffect} from 'react';
import { useParams} from "react-router-dom";
import { fetchEventMovie } from '../../features/moviesManagement/api.js';
import MovieSlider from '../../components/Sliders/MovieSlider';
import createRoom from '../../features/room/createRoom.js';
import RoomGenerator from '../../components/Rooms/RoomGenerator';
function Events() {
    const { event } = useParams();
    const [movie, setMovie] = useState({});
    const [allSessions, setAllSessions] = useState([]);
    const [room, setRoom] = useState({});
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    
    
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
        setRoom(createRoom(formatedMovie[0].seatsDisplay));
        setMovie(formatedMovie[0]);
        setAllSessions(formatedMovie);
    } 
    
    function formatData(movie) {
        const movieCopy = {...movie}
        const date = new Date(movie.date);
        const time = movie.time.substring(0, 5);
        const releaseDate = new Date(movie.releaseDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', })
        const seatsArray = JSON.parse(movie.seatsDisplay);
        movieCopy.seatsDisplay = seatsArray
        movieCopy.date= date;
        movieCopy.time = time;
        movieCopy.releaseDate = releaseDate
        return movieCopy;
    }
    
    function handleReservationClick() {
        setIsReservationOpen(!isReservationOpen);
    }
    
    useEffect(()=>{
        getMovie()
    }, [])
    console.log(movie)
    return(
        <main id="eventPageMain">
            <img className="movieCover" src={movie.coverImgUrl} alt={movie.coverImgAlt}  />
            <section className="movieDescription">
                <section id="eventDescription" >
                    <h2>{pageContent.header}</h2>
                    <p>{pageContent.eventDescription}</p>
                </section>
                
                
 
                <section id="movie_info">
                    <h3 id="moviePage_title">{movie.title}</h3>
                    <aside id="movieDetail">  
                        <img class='moviePoster' src={movie.poster} alt={movie.posterAlt} />
                        <ul>
                            <li><span className="movieFeatureHeader">Durée : </span><span className="movieFeature"> {movie.length} minutes</span></li>
                            <li><span className="movieFeatureHeader">De : </span><span className="movieFeature">{movie.directors && movie.directors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Avec : </span><span className="movieFeature">{movie.actors && movie.actors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Date de sortie : </span><span className="movieFeature">{movie.releaseDate}</span></li>
                            {movie.pg && <li><span className="movieFeatureHeader">public : </span><span className="movieFeature">{movie.pg}</span></li>}
                            {movie.warning && <li><span className="movieFeatureHeader">avertissements : </span><span className="movieFeature">{movie.warning.replace(/,/g, ', ')}</span></li>}
                        </ul>
                    </aside>
                    {movie.date && (
                    <div className="eventSessionContainer">
                            <p className="movieSessionText">
                                {movie.date.toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', })} <br />
                                {movie.time}
                            </p>
                            <button className='reservationBtn' onClick={handleReservationClick}>reserver</button>
                        </div>
                    )}
                    {isReservationOpen && <RoomGenerator roomSettings={room} isInFrontOffice={true} />}
                    </section>
            </section>
            <section className="eventSessionSlider" >
                <h3>La programation</h3>
                <MovieSlider movieRow={allSessions} />
            </section>
        </main>
    )
}

export default Events;
