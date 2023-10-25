import { useState, useEffect } from 'react';
import { fetchAllRooms } from '../../features/room/api.js';
import PrintAllRooms from '../../components/Rooms/PrintAllRooms';
import RoomGenerator from '../../components/Rooms/RoomGenerator'

function RoomsManagement () {
    const [action, setAction] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [roomToUpdate, setRoomToUpdate] = useState({});
    
    async function fetchData() {
            try {
                console.log('passe');
                const response = await fetchAllRooms()
                setRooms(response);
            }catch (err) {
                console.log(err)
            }
        }
    useEffect(()=> {
        fetchData();
    },[]);
    
    function handleChange(e) {
      setAction(Number(e.target.value));
    }
    
    return(
        <main className="backOfficeMain">
            <form onSubmit={(e) => e.preventDefault()}>
                
                <label>
                  <input
                    type="radio"
                    name="action"
                    value={0}
                    checked={action === 0}
                    onChange={handleChange}
                  />
                  Gérer les salles
                </label>
          
                <label>
                  <input
                    type="radio"
                    name="action"
                    value={1}
                    checked={action === 1}
                    onChange={handleChange}
                  />
                  Ajouter une salle
                </label>
                
                {action === 0 && !roomToUpdate.seatsDisplay &&
                    <PrintAllRooms 
                        fetchData={fetchData} 
                        rooms={rooms}
                        setRoomToUpdate={setRoomToUpdate}
                    />}
                    
                {action === 1 && <RoomGenerator setAction={setAction} />}
                
                {roomToUpdate.seatsDisplay && 
                    <RoomGenerator
                        update={true}
                        name={roomToUpdate.name}
                        roomSettings={roomToUpdate.seatsDisplay} 
                        setRoomToUpdate={setRoomToUpdate}
                        fetchData={fetchData}
                        />}
            </form>
        </main>
        )
}
export default RoomsManagement