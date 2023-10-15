import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllRooms, deleteRoom } from '../../features/room/api.js';

function RoomsManagement () {
    const [rooms, setRooms] = useState([]);
    
    async function fetchData() {
            try {
                const response = await fetchAllRooms()
                setRooms(response);
            }catch (err) {
                console.log(err)
            }
        }
    useEffect(()=> {
        fetchData();
    },[]);
    
    async function deleteOneRoom(id) {
        const response = await deleteRoom(id)
        await fetchData();
    }
    
    return(
        <ul>
            {rooms.map((c,i) => {
                return (
                <li key={i}>
                    {c.name} : {c.nbSeats}
                    <Link to={`updateRoom/${c.name}`}>Modifier</Link>
                    <button type="button" onClick={() => deleteOneRoom(c.name)}>Supprimer</button>
                </li>
                );
            })}
        </ul>
        )
}
export default RoomsManagement