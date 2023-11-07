import { deleteRoom, fetchOneRoom } from '../../features/room/api.js';

function PrintAllRooms({ fetchData, rooms, setRoomToUpdate }) {
    
    async function getRoom(id) {
        const result = await fetchOneRoom(id);
        setRoomToUpdate(result);
    }   
    async function deleteOneRoom(id) {
        const response = await deleteRoom(id)
        await fetchData();
    }

    return (
        <>
            <ul>
                {rooms.map((c,i) => {
                    return (
                    <li key={i}>
                        {c.name} : {c.nbSeats}
                        <button type="button" onClick={() => getRoom(c.name)}>Modifier</button>
                        <button type="button" onClick={() => deleteOneRoom(c.name)}>Supprimer</button>
                    </li>
                    );
                })}
            </ul>
        </>
        )
}

export default PrintAllRooms