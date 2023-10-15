import { fetchOneRoom } from '../room/api.js';
import createRoom from '../room/createRoom.js';

export async function postSession(idMovie, sessionInfo) {
    try {
        console.log(sessionInfo)
        const room = await fetchOneRoom(sessionInfo.idRoom);
        const seatMap = (createRoom(room.seatsDisplay)).seats;

        
        const session = {
            date: sessionInfo.date,
            time: sessionInfo.time,
            seatMap,
            idMovie,
            idRoom: sessionInfo.idRoom,
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

export async function deleteOneSession(id) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse.message);
        
    }catch (err) {
        console.log(err);
    }
}