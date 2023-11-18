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
                    <li className="roomListItem" key={i}>
                        salle {c.name} <br />
                        capacité : {c.nbSeats} <br />
                        <div className="managementBtnContainer">
                            <button className="backofficeBtn" type="button" onClick={() => getRoom(c.name)}>Modifier</button>
                            <button className="backofficeBtn" type="button" onClick={() => deleteOneRoom(c.name)}>Supprimer</button>
                        </div>
                    </li>
                    );
                })}
            </ul>
        </>
        )
}

export default PrintAllRooms