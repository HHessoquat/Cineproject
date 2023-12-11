import React from 'react';
import { useState } from 'react';
import createRoom from '../../features/room/createRoom.js';
import { fetchOneRoom } from '../../features/room/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ModalContainer from '../Modals/ModalContainer';
import Trailer from './Trailer';
import RoomGenerator from '../Rooms/RoomGenerator';

function DisplayMovie({movie, sessions}) {
    
    const [showTrailer, setShowTrailer] = useState(false);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
    const [room, setRoom] = useState({});
    const [showSessionTime, setShowSessionTime] = useState(null);
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const printSynopsis = movie.synopsis ? (showFullSynopsis ? movie.synopsis : `${movie.synopsis.slice(0, 100)}...`) : "";
    
    const datesToPrint = sessions.reduce((acc, session) => {
              if (!acc.includes(session.date)) {
                acc.push(`${session.title ? `${session.title.replace(/\s/g, '<-sp->')}  ` : ''}${session.date}`);
              }
              return acc;
            }, []);

    
    function printTime(e, date){
        e.preventDefault()
        const sessionsDate = date.split(' ').slice(-3).join(' ');

        if(showSessionTime === sessionsDate){
            setShowSessionTime(null);
            return
        }
        setShowSessionTime(sessionsDate);
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

    return(
        <>
            {isReservationOpen && (
                <ModalContainer close={handleReservationClick} modalClass="reservationModal">
                    <p className="reservationHeader"> Choisissez votre place </p>
                        <RoomGenerator roomSettings={room} isInFrontOffice={true} />
                        <button type="button" onClick={handleReservationClick} > annuler </button>
                </ModalContainer>        
            )}
            
             {showTrailer && (
                <div className="modalContainer" onClick={() => setShowTrailer(false)}>
                    <Trailer trailer={movie.trailer} closeLecter={() => setShowTrailer(false)} />
                </div>
            )}
            
            <div id="movieDescription">
            
                <button id="trailerButton" type="button" onClick={() => setShowTrailer(true)}><FontAwesomeIcon icon={faPlay} style={{color: "#ffffff", fontSize: '6em'}} /></button>
                <figure className="movieCoverContainer">
                    <img
                        className="movieCover"
                        src={movie.coverImgUrl}
                        alt={movie.coverImgAlt}
                    />
                </figure>
                <section id="movie_info">
                    
                    <div id="movieDetail">
                        <img className="moviePoster" src={movie.poster} alt={movie.posterAlt} />
                        <div className="movieFeaturesContainer">
                            <h2 id="moviePage_title">{movie.title}</h2>
                            <ul>
                                
                                <li>
                                    <span className="movieMainFeature"> {movie.length} minutes</span>
                                        <span className="movieMainFeatureDivider">&bull;</span>
                                    <span className="movieMainFeature"> {movie.category ? movie.category.replace(/,/g, ', ') : ''} </span>
                                </li>
                                <li><span className="movieFeatureHeader">De : </span><span className="movieFeature">{movie.directors && movie.directors.replace(/,/g, ', ')}</span></li>
                                <li><span className="movieFeatureHeader">Avec : </span><span className="movieFeature">{movie.actors && movie.actors.replace(/,/g, ', ')}</span></li>
                                <li><span className="movieFeatureHeader">Date de sortie : </span><span className="movieFeature">{movie.releaseDate}</span></li>
                                {movie.pg && <li><span className="movieFeatureHeader">public : </span><span className="movieFeature">{movie.pg}</span></li>}
                                {movie.warning && 
                                    <li>
                                        <span className="movieFeatureHeader">avertissements : </span>
                                        <span className="movieFeature">{movie.warning.replace(/,/g, ', ')}</span> 
                                    </li>
                                }
                                <li id="synopsis">{printSynopsis} <br/>
                                {movie.synopsis && movie.synopsis.length > 100 &&
                                    <button className="showSynopsisButton" onClick={() => setShowFullSynopsis(!showFullSynopsis)}>
                                        {showFullSynopsis ? 'Réduire' : 'Lire la suite'}
                                    </button>
                                }</li>
                            </ul>
                        </div>
                    </div>
                    
                    
                    <aside >
                        <h3 className="sessionTitle">Les séances</h3>
                        {!datesToPrint && <p>Il n'y a pas encore de séances pour ce film</p>}
                        <div className="movieSessionContainer">
                            {datesToPrint.map((c,i) => {
                                return (
                                    <div className='movieSessionInfo' key={i}>
                                    
                                        <button 
                                            type="button" 
                                            className={`movieSessionBtn ${c === showSessionTime ? "selected" : ''}` } 
                                            onClick={(e) => printTime(e, c)}
                                        >
                                            {c.split(' ').map((word, index) => (
                                                <React.Fragment key={index}>
                                                    <span >
                                                        {word.replace(/<-sp->/g, ' ')}
                                                    </span> 
                                                    <br />
                                                </React.Fragment>
                                            ))} 
                                        </button>
                                    </div>
                                )
                            })}
                            
                        </div>
                        {showSessionTime && ( 
                            <div className="sessionTimeContainer">
                                {sessions.map((c, i) => {
                                    if (c.date === showSessionTime) {

                                        return (
                                            <button 
                                            key={i}
                                                className="movieSessionBtn sessionTime" 
                                                onClick={() => handleReservationClick(c.idRoom, c.seatMap)}
                                            >
                                                {c.time}
                                            </button>
                                        );
                                    } else return '';
                                })}
                            </div>
                        )}
                    </aside>
                    
                </section>
            </div>
            
        </>
        )
}

export default DisplayMovie;