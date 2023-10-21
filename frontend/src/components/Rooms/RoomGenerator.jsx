import { useState, useEffect } from 'react';
import validateDatas from '../../features/room/validateDatas.js';
import createRoom from '../../features/room/createRoom.js';
import { sendRoom } from '../../features/room/api.js';

function RoomGenerator({update, name, roomSettings, setAction, setRoomToUpdate, fetchData}) {
    const [room, setRoom] = useState(
                                createRoom([
                                    [2, 2, 2],
                                    [2, 2, 2],
                                    [0,0,0,0]
                                ]));
    const [roomName, setRoomName] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    
    useEffect(()=>{
        if (update && name && roomSettings) {
        setRoomName(name)
        setRoom(createRoom(roomSettings));
        return fetchData;
    }
    },[])
    
    
    function handleChange(e) {
        setRoomName(e.target.value);
        setErrorMsg([]);
    }
    const alphabet = [
        'a ',
        'b ',
        'c ',
        'd ',
        'e ',
        'f ',
        'g ',
        'h ',
        'i ',
        'j ',
        'k ',
        'l ',
        'm ',
        'n ',
        'o ',
        'p ',
        'q ',
        'r ',
        's ',
        't ',
        'u ',
        'v ',
        'w ',
        'x ',
        'y ',
        'z ',
    ];
    
    function addBlockH() {
        const previousDisplay = [...room.seatsSetting[0]];
        previousDisplay.push(1);
        room.seatsSetting[0] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    
    function addBlockV() {
        const previousDisplay = [...room.seatsSetting[1]];
        previousDisplay.push(1);
        room.seatsSetting[1] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    function deleteBlockH() {
        const previousDisplay = [...room.seatsSetting[0]];
        previousDisplay.pop();
        room.seatsSetting[0] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    function deleteBlockV() {
        const previousDisplay = [...room.seatsSetting[1]];
        previousDisplay.pop();
        room.seatsSetting[1] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    
    function addSeatInColumn(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[0][blockIndex] + 1;
        room.seatsSetting[0][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    
    function removeSeatInColumn(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[0][blockIndex] - 1;
        room.seatsSetting[0][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    
    function addRowInBlock(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[1][blockIndex] + 1;
        room.seatsSetting[1][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    function removeRowInBlock(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[1][blockIndex] - 1;
        room.seatsSetting[1][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    

    function handleSeatClick(row, column) {
        room.seats[row][column] = true;
    }
    
    
    async function handleCreateClick(){
        if (update)  {
            await sendRoom('PUT', roomName, room, validateDatas, setErrorMsg, name);
            setRoomToUpdate({});
        }else {
            sendRoom('POST', roomName, room, validateDatas, setErrorMsg);
            setAction(0);
        }
    }
    
    let verticalBlockIterator = 0;
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Nom de la salle : 
                    <input type="text" onChange={handleChange} value={roomName} />
                </label>
            </form>
            {errorMsg && errorMsg.map((c,i)=> {return <p key={i-123*(-12)}>{c}</p>})}
            <button type="button" onClick={addBlockH}>ajouter un block horizontal</button>
            <button type="button" onClick={addBlockV}>ajouter un block vertical</button>
            <button type="button" onClick={deleteBlockH}>supprimer un block horizontal</button>
            <button type="button" onClick={deleteBlockV}>supprimer un block vertical</button>
            
            <div>
                {room.seats.map((c, i) => {
                    let blockSeatIterator = 0;
                    
                            //the map below will create one row of seats with the right number of columns
                    const seatImage = c.map((current, index) => {
                    
                        let seatElement;
                                    //create the html element with the relevent seat image
                        if (current === null) {
                            seatElement = (
                                <img
                                    key={i + ' ' + -index}
                                    src='/img/room/emptySeat.png'
                                    alt="blank space"
                                    className="roomMapSeat"
                                />
                            );
                        } else if (current === false) {
                            seatElement = (
                                <button
                                    key={i + ' ' + index * 1000}
                                    onClick={() => handleSeatClick(i, index)}
                                    className="roomMap_btn"
                                >
                                    <img
                                        src='/img/room/freeSeat.png'
                                        alt="place libre"
                                        className="roomMapSeat"
                                    />
                                </button>
                            );
                        } else {
                            seatElement = (
                                <img
                                    key={i + ' ' + index * 100}
                                    src='/img/room/takenSeat.png'
                                    alt="place réservée"
                                    className="roomMapSeat"
                                />
                            );
                        }
                        
                        let seatAndCorridor;
   
                        
                                //if the seat is the last, horizontally of the block, we add a button to add a seat
                        if (index === room.hCorridorIndex[blockSeatIterator] - 1){
                            
                            const currentHBlock = blockSeatIterator;
                            
                            const seatAndButton = (
                                <span key={i + ' ' + index * 2}>
                                    {seatElement}
                                    <button type="button" onClick={() => addSeatInColumn(currentHBlock)}>+</button>
                                    <button type="button" onClick={() => removeSeatInColumn(currentHBlock)}>-</button>
                                    <img
                                        src='/img/room/emptySeat.png'
                                        alt="corridor"
                                        className="roomMapSeat"
                                    />
                                </span>
                            )
                            blockSeatIterator++;
                            return seatAndButton
                        }else {
                             return seatElement;
                        }
    
                    });
                    
                    const seatRow = (
                        <div>
                            <p>
                                {alphabet[i]} {seatImage}
                            </p>
                        </div>
                    );

                            //if this is first row of a block, we add an empty image Before
                    if (i === room.vCorridorIndex[verticalBlockIterator]) {
                    
                        
                        const rowAndCorridor = (
                            
                            <div key={i}>
                                <img
                                    src='/img/room/emptySeat.png' 
                                    alt="corridor"
                                    className="roomMapSeat"
                                />
                                
                                {seatRow}
                                
                                
                            </div>
                        );
                        
                        return rowAndCorridor;
                    }
                            //if this is the last row of a block, we add un button to add a row
                    else if (i === room.vCorridorIndex[verticalBlockIterator] -1 ) {

                    const currentvBlockIndex = verticalBlockIterator;
                        const rowAndButton = (
                        
                            <div key={i} >
                                {seatRow}
                                <button type="button" onClick={() => addRowInBlock(currentvBlockIndex)}>Ajouter une rangée</button>
                                <button type="button" onClick={() => removeRowInBlock(currentvBlockIndex)}>enlever une rangée</button>
                            </div>
                        );
                        
                        verticalBlockIterator++;
                        
                        return rowAndButton;
                    }else {
                        return <div key={i}>{seatRow}</div>;
                    }
                })}
            </div>
            <button type="button" onClick={handleCreateClick}>Créer la salle</button>
        </>
    );
}
export default RoomGenerator;
