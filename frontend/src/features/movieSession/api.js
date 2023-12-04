import { fetchOneRoom } from '../room/api.js';
import createRoom from '../room/createRoom.js';

export async function postSession(idMovie, sessionInfo) {
    try {

        const room = await fetchOneRoom(sessionInfo.idRoom);
        const seatMap = (createRoom(room.seatsDisplay)).seats;

        
        const session = {
            date: sessionInfo.date,
            time: sessionInfo.time,
            event: sessionInfo.event,
            seatMap,
            idMovie,
            idRoom: sessionInfo.idRoom,
        }

        const fetchResult = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/`, {
            method: 'POST',
            credentials: 'include',
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
            credentials: 'include',
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

export async function deleteOneSession(id) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/${id}`, {
            method: 'DELETE',
            credentials: 'include',
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

export async function deleteSessions(movieId) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movieSession/all/${movieId}`, {
                method: 'DELETE',
                credentials: 'include',
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