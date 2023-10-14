import { fetchOneRoom } from '../../features/room/api.js';
import { useState, useEffect } from 'react';
import  { useParams } from 'react-router-dom';
import RoomGenerator from '../../components/room/RoomGenerator.jsx';

function UpdateRoom() {
    const { id } = useParams()
    const [room, setRoom] = useState({});
    useEffect(()=> {
        async function fetchRoom() {
            try {
                const retrievedRoom = await fetchOneRoom(id, setRoom);
                setRoom(retrievedRoom);
            }catch (err) {
                console.log(err);
            }
        }
        
            fetchRoom();
        
            
        
    },[]);

    return(
        <>
        {room.seatsDisplay && <RoomGenerator update={true} name={room.name} roomSettings={room.seatsDisplay} />}
        </>
        );
        
}

export default UpdateRoom