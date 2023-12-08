import { useState, useEffect } from 'react';
import validateDatas from '../../features/room/validateDatas.js';
import createRoom from '../../features/room/createRoom.js';
import { sendRoom } from '../../features/room/api.js';

function RoomGenerator({update, name, roomSettings, setAction, setRoomToUpdate, fetchData, isInFrontOffice}) {
    const [room, setRoom] = useState(
                                createRoom([
                                    [2, 2, 2], //horizontal seat display, [2, 3] create rows as follows : two seats, a corridor, three seats
                                    [2, 2, 2], //vertical seat display, [3, 4] create 3 seats rows, a corridor, 4 seat rows
                                    [0,0,0,0] //coordinate of the entrance : [1,2,1,2] remove the two first seats of the two first rows
                                ]));
    const [roomName, setRoomName] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    
    useEffect(()=>{
        if (update && name && roomSettings) {
        setRoomName(name)
        setRoom(createRoom(roomSettings));
    }
    },[]);
    
    useEffect(() => {
        if (isInFrontOffice) {
            setRoom(roomSettings);
        }
    }, [])
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
        if (previousDisplay.length > 1 ) {
            previousDisplay.pop();
            room.seatsSetting[0] = previousDisplay;
            setRoom(createRoom(room.seatsSetting));
            setErrorMsg([]);
        }
    }
    function deleteBlockV() {
        const previousDisplay = [...room.seatsSetting[1]];
        if (previousDisplay.length > 1 ) {
            previousDisplay.pop();
            room.seatsSetting[1] = previousDisplay;
            setRoom(createRoom(room.seatsSetting));
            setErrorMsg([]);
        }
    }
    
    function addSeatInColumn(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[0][blockIndex] + 1;
        room.seatsSetting[0][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    
    function removeSeatInColumn(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[0][blockIndex] - 1;
        if (newNumberofRowInBlock > 0) {
            room.seatsSetting[0][blockIndex] = newNumberofRowInBlock;
            setRoom(createRoom(room.seatsSetting));
            setErrorMsg([]);
        }
    }
    
    function addRowInBlock(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[1][blockIndex] + 1;
        room.seatsSetting[1][blockIndex] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        setErrorMsg([]);
    }
    function removeRowInBlock(blockIndex) {
        const newNumberofRowInBlock = room.seatsSetting[1][blockIndex] - 1;
        if (newNumberofRowInBlock > 0) {
            room.seatsSetting[1][blockIndex] = newNumberofRowInBlock;
            setRoom(createRoom(room.seatsSetting));
            setErrorMsg([]);
        }
    }
    

    function handleSeatClick(row, column) {
        const newSeats= [...room.seats];
        newSeats[row][column] = !newSeats[row][column];
        const updatedRoom = {...room, seats: newSeats}
        setRoom(updatedRoom);
    }
    
    
    async function handleCreateClick(){
        if (update)  {
            await sendRoom('PUT', roomName, room, validateDatas, setErrorMsg, name);
            await fetchData();
            setRoomToUpdate({});
        }else {
            await sendRoom('POST', roomName, room, validateDatas, setErrorMsg);
            await fetchData();
            setAction(0);
        }
    }

    let verticalBlockIterator = 0;
    return (
        <>
            {!isInFrontOffice && (
                <form className="roomForm" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Nom de la salle : 
                        <input type="text" onChange={handleChange} value={roomName} />
                    </label>
                </form>
            )}
            {!isInFrontOffice && errorMsg && errorMsg.map((c,i)=> {return <p key={i}>{c}</p>})}
            {!isInFrontOffice &&(
                <div className="managementBtnContainer backofficeFormBtn roomManagementBtnContainer">
                    <button className="backofficeBtn smallBtn roomManagementBtn" type="button" onClick={addBlockH}>Ajouter un block <br/> horizontal</button>
                    <button className="backofficeBtn smallBtn roomManagementBtn" type="button" onClick={addBlockV}>Ajouter un block <br/>  vertical</button>
                    <button className="backofficeBtn smallBtn roomManagementBtn" type="button" onClick={deleteBlockH}>Supprimer un block <br/>  horizontal</button>
                    <button className="backofficeBtn smallBtn roomManagementBtn" type="button" onClick={deleteBlockV}>Supprimer un block <br/>  vertical</button>
                </div>
            )}
            <div className='roomcontainer'>
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
                                    key={i+index}
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
                                <button key={i+index} 
                                    className="roomMap_btn" 
                                    onClick={() => handleSeatClick(i, index)}
                                >
                                    <img
                                        src='/img/room/takenSeat.png'
                                        alt="place réservée"
                                        className="roomMapSeat"
                                    />
                                </button>
                            );
                        }
                        
                                //if the seat is the last, horizontally of the block, we add a button to add a seat
                        if (index === room.hCorridorIndex[blockSeatIterator] - 1){
                            
                            const currentHBlock = blockSeatIterator;
                            
                            const addSeatsButton = (
                                <>
                                    <button className="addSeatBtn" type="button" onClick={() => addSeatInColumn(currentHBlock)}>+</button>
                                    <button className="addSeatBtn" type="button" onClick={() => removeSeatInColumn(currentHBlock)}>-</button>
                                </>
                            )
                            const seatAndButton = (
                                <span key={i+index}>
                                    {seatElement}
                                    {!isInFrontOffice && addSeatsButton}
                                    <img
                                        src='/img/room/emptySeat.png'
                                        alt="corridor"
                                        className="roomMapSeat corridor"
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
                                <span className="rowKey">{alphabet[i]}</span> {seatImage}
                            </p>
                        </div>
                    );

                            // if this is the last row of a block, we add button to add a row
                    if (i === room.vCorridorIndex[verticalBlockIterator] -1 ) {

                        const currentvBlockIndex = verticalBlockIterator;
                        const addRowButtons =(
                                <div className="managementBtnContainer">
                                    <button className="addSeatBtn" type="button" onClick={() => addRowInBlock(currentvBlockIndex)}>Ajouter une rangée</button>
                                    <button className="addSeatBtn" type="button" onClick={() => removeRowInBlock(currentvBlockIndex)}>enlever une rangée</button>
                                </div>
                                )
                        const rowAndButton = (
                            
                            <div key={i} >
                                {seatRow}
                                {!isInFrontOffice && addRowButtons}
                                <img
                                    src='/img/room/emptySeat.png' 
                                    alt="corridor"
                                    className="roomMapSeat corridor"
                                />
                            </div>
                        );
                        
                        verticalBlockIterator++;
                        
                        return rowAndButton;
                    }else {
                        return <div key={i}>{seatRow}</div>;
                    }
                })}
            </div>
            {!isInFrontOffice && 
                <button
                    className="backofficeBtn"
                    type="button" 
                    onClick={handleCreateClick}
                > 
                    {update ? 'Modifier la salle' : 'Créer la salle'} 
                </button>
                
            }
            {isInFrontOffice && <button type="button" onClick={() => {}}> Réserver ma place</button>}
        </>
    );
}
export default RoomGenerator;
