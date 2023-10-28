import {useState, useEffect} from 'react';
import createRoom from '../../features/room/createRoom.js';
import { fetchOneRoom } from '../../features/room/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trailer from './Trailer';
import RoomGenerator from '../Rooms/RoomGenerator';
import { faPlay, faCircleDot } from '@fortawesome/free-solid-svg-icons';

function DisplayMovie({movie, sessions}) {
    
    const [showTrailer, setShowTrailer] = useState(false);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [room, setRoom] = useState({});
    const [showSessionTime, setShowSessionTime] = useState(null);
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const printSynopsis = movie.synopsis ? (showFullSynopsis ? movie.synopsis : `${movie.synopsis.slice(0, 100)}...`) : "";
    
    const datesToPrint = sessions.reduce((acc, session) => {
              if (!acc.includes(session.date)) {
                acc.push(session.date);
              }
              return acc;
            }, []);

    
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
    console.log('movie : ', movie)
    console.log('sessions : ', sessions)
    console.log('datesToPrint : ', datesToPrint)
    return(
        <>
            {isReservationOpen && (
            <div className="modalContainer" >
                <div className="reservationModal" onBlur={handleReservationClick}>
                    <p className="reservationHeader"> Choisissez votre place </p>
                        <RoomGenerator roomSettings={room} isInFrontOffice={true} />
                        <button type="button" onClick={handleReservationClick} > annuler </button>
                </div>
                
            </div>
            )}
            
             {showTrailer && (
                <div className="modalContainer" onClick={() => setShowTrailer(false)}>
                    <Trailer trailer={movie.trailer} closeLecter={() => setShowTrailer(false)} />
                </div>
            )}
            
            <article id="movieDescription">
            
                <button id="trailerButton" type="button" onClick={() => setShowTrailer(true)}><FontAwesomeIcon icon={faPlay} style={{color: "#ffffff", fontSize: '6em'}} /></button>
                <img
                    className="movieCover"
                    src={movie.coverImgUrl}
                    alt={movie.coverImgAlt}
                />
                <section id="movie_info">
                   
                    <main id="movieDetail">
                        <img className="moviePoster" src={movie.poster} alt={movie.posterAlt} />
                        <ul>
                            <h2 id="moviePage_title">{movie.title}</h2>
                            <li>
                                <span className="movieMainFeature"> {movie.length} minutes</span>
                                <FontAwesomeIcon className="mainFeatureSeparator" icon={faCircleDot} style={{color: "#ffffff",}} />
                                <span className="movieMainFeature"> {movie.category} </span>
                                </li>
                            <li><span className="movieFeatureHeader">De : </span><span className="movieFeature">{movie.directors && movie.directors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Avec : </span><span className="movieFeature">{movie.actors && movie.actors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Date de sortie : </span><span className="movieFeature">{movie.releaseDate}</span></li>
                            {movie.pg && <li><span className="movieFeatureHeader">public : </span><span className="movieFeature">{movie.pg}</span></li>}
                            {movie.warning && 
                                <li><span className="movieFeatureHeader">avertissements : </span>
                            <span className="movieFeature">{movie.warning.replace(/,/g, ', ')}</span></li>
                            }
                            <li id="synopsis">{printSynopsis}</li>
                            {movie.synopsis && movie.synopsis.length > 100 &&
                                <button className="showSynopsisButton" onClick={() => setShowFullSynopsis(!showFullSynopsis)}>
                                    {showFullSynopsis ? 'Réduire' : 'Lire la suite'}
                                </button>
                            }
                        </ul>
                    </main>
                    
                    
                    <aside >
                        <h3 className="sessionTitle">Les séances</h3>
                        {!datesToPrint && <p>Il n'y a pas encore de séances pour ce film</p>}
                        <div className="movieSessionContainer">
                            {datesToPrint.map((c,i) => {
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
                        </div>
                    </aside>
                    
                </section>
            </article>
            
        </>
        )
}

export default DisplayMovie;