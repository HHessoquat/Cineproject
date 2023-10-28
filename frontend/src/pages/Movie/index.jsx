import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import { fetchMovieData} from '../../features/moviesManagement/api.js';
import { fetchOneRoom } from '../../features/room/api.js';
import createRoom from '../../features/room/createRoom.js';
import {parseDate} from '../../utils/dateFormat/parseDate.js';
import { fetchSession } from '../../features/movieSession/api.js';
import RoomGenerator from '../../components/Rooms/RoomGenerator';
import Trailer from '../../components/Movies/Trailer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    const [sessions, setSessions] = useState([]);
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const printSynopsis = movie.synopsis ? (showFullSynopsis ? movie.synopsis : `${movie.synopsis.slice(0, 100)}...`) : "";
    const [showSessionTime, setShowSessionTime] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [room, setRoom] = useState({});
    
    let groupedSessions = [];
    
    async function fetchData() {
        const movieResult = await fetchMovieData(idMovie);
        const newMovie = formatMovieData(movieResult);
        setMovie(newMovie);
        
        const sessionResult = await fetchSession(newMovie.id);
        const newSessions = formatSessionData(sessionResult);
        setSessions(newSessions);
        }
        
    function formatMovieData(data) {
        const dataCopy = {...data}
        const releaseDate = new Date(data.releaseDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', });
        dataCopy.releaseDate= releaseDate;
            return dataCopy;
    }
    function formatSessionData(allSessions){
        const dataCopy  = [...allSessions];
        const formattedData = dataCopy.map((c) => {
            c.date = new Date(c.date).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', });
            c.time = c.time.substring(0, 5);
            return c;
        });
        return formattedData;
    }
    
    function groupSession(){
        if (sessions) {
            groupedSessions = sessions.reduce((acc, session) => {
              if (!acc.includes(session.date)) {
                acc.push(session.date);
              }
              return acc;
            }, []);
        }
    }
    
    function printTime(date){
        if(showSessionTime === date){
            setShowSessionTime(null);
            return
        }
        setShowSessionTime(date);
    }
    
    async function handleReservationClick(id, seatsMap) {
        if (Object.keys(room).length === 0){
            const retrievedRoom = await fetchOneRoom(id);
            const newRoom= createRoom(retrievedRoom.seatsDisplay);
            
            newRoom.seats = JSON.parse(seatsMap);
            setRoom(newRoom);
        }else {
            setRoom({});
        }
        setIsReservationOpen(!isReservationOpen);
    }
    
    useEffect(() => {
            fetchData();
    }, []);
    groupSession(
        )
     console.log(movie)
    return (
        <main>
            {isReservationOpen && (
            <div className="modalContainer">
                <div className="reservationModal">
                    <p className="reservationHeader"> Choisissez votre place </p>
                        <RoomGenerator roomSettings={room} isInFrontOffice={true} />
                   <button type="button" className='sendReservationBtn'>Réserver ma place</button>
                </div>
                
            </div>
                )}
                {showTrailer && (
                    <div className="modalContainer">
                        <Trailer trailer={movie.trailer} closeLecter={() => setShowTrailer(false)} />
                    </div>
                )}
            <article className="movieDescription">
            
                <img
                    className="movieCover"
                    src={movie.coverImgUrl}
                    alt={movie.coverImgAlt}
                />
                <section id="movie_info">
                    <button id="trailerButton" type="button" onClick={() => setShowTrailer(true)}><FontAwesomeIcon icon={faPlay} style={{color: "#ffffff", fontSize: '6em'}} /></button>
                    <main id="movieDetail">
                        <img className="moviePoster" src={movie.poster} alt={movie.posterAlt} />
                        <ul>
                            <h2 id="moviePage_title">{movie.title}</h2>
                            <li><span className="movieFeatureHeader">Durée : </span><span className="movieFeature"> {movie.length} minutes</span></li>
                            <li><span className="movieFeatureHeader">De : </span><span className="movieFeature">{movie.directors && movie.directors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Avec : </span><span className="movieFeature">{movie.actors && movie.actors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Date de sortie : </span><span className="movieFeature">{movie.releaseDate}</span></li>
                            {movie.pg && <li><span className="movieFeatureHeader">public : </span><span className="movieFeature">{movie.pg}</span></li>}
                            {movie.warnings && 
                                <li><span className="movieFeatureHeader">avertissements : </span>
                            <span className="movieFeature">{movie.warnings}</span></li>
                            }
                            <li id="synopsis">{printSynopsis}</li>
                            {movie.synopsis && movie.synopsis.length > 100 &&
                                <button className="showSynopsisButton" onClick={() => setShowFullSynopsis(!showFullSynopsis)}>
                                    {showFullSynopsis ? 'Réduire' : 'Lire la suite'}
                                </button>
                            }
                        </ul>
                    </main>
                    
                    
                    <aside className="movieSessionContainer">
                    
                    {groupedSessions.map((c,i) => {
                        return (
                            <div className='movieSessionInfo' key={i}>
                            
                                <button className={`movieSessionBtn ${c === showSessionTime ? "selected" : ''}` } onClick={() => printTime(c)}>
                                    <textarea className="multi-line-Button" readOnly rows="3" value={c.replace(/ /g, '\n')} />
                                </button>
                                
                                {showSessionTime && ( 
                                    <div className="sessionTimeContainer">
                                        {sessions.map((c, i) => {
                                            if (c.date === showSessionTime) {
                                                return (
                                                    <button 
                                                    key={-2-i*5*3*11*43}
                                                        className="movieSessionBtn sessionTime" 
                                                        onClick={() => handleReservationClick(c.idRoom, c.seatMap)}
                                                    >
                                                        {c.time}
                                                    </button>
                                                );
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    </aside>
                    
                </section>
            </article>
            
        </main>
    );
}
export default Movie;
