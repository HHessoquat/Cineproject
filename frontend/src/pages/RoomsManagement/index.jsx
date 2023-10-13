import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RoomsManagement () {
    const [rooms, setRooms] = useState([]);
    
    async function fetchData() {
            try {
                const response = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/room',{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data)
                setRooms(data.content);
            }catch (err) {
                console.log(err)
            }
        }
    useEffect(()=> {
        fetchData();
    },[]);
    
    async function deleteRoom(id) {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/room/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        });
        const parsedResponse = await response.json();
        console.log(parsedResponse.message);
        await fetchData();
    }
    
    return(
        <ul>
            {rooms.map((c,i) => {
                return (
                <li key={i}>
                    {c.name} : {c.nbSeats}
                    <Link to={`updateRoom/${c.name}`}>Modifier</Link>
                    <button type="button" onClick={() => deleteRoom(c.name)}>Supprimer</button>
                </li>
                );
            })}
        </ul>
        )
}
export default RoomsManagement