import { fetchOneRoom } from '../room/api.js';
import createRoom from '../room/createRoom.js';

export async function postSession(idRoom, idMovie, sessionInfo) {
    try {
        const room = await fetchOneRoom(idRoom);
        const seatMap = (createRoom(room.seatsDisplay)).seats;

        
        const session = {
            date: sessionInfo.date,
            time: sessionInfo.time,
            seatMap,
            idMovie,
            idRoom,
        }

        const fetchResult = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(session)
        });
    }catch (err) {
        console.log(err);
    }
}

export async function fetchSession(movieId) {
    try{
        const fetchResult = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/${movieId}`, {
            method: 'GET',
            headers: {
                'Accept': 'Application/json',
            }
        });
        const retrievedSessions = await fetchResult.json();
        console.log(`Réponse de l'api :`, retrievedSessions.message);
        return retrievedSessions.content;
    }catch (err) {
        console.log(err)
    }
    
}

export async function putSession() {
    
}