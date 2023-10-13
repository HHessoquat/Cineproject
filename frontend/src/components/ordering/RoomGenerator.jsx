import { useState } from 'react';

function RoomGenerator() {
    // const room = createRoom([
    //     [6, 10, 6],
    //     [4, 6, 8],
    //     [0, 0, 0, 0],
    // ]);
    const [room, setRoom] = useState(
                                createRoom([
                                    [2, 2, 2],
                                    [2, 2, 2],
                                    [0,0,0,0]
                                ]));
    
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
    }
    
    function addBlockV() {
        const previousDisplay = [...room.seatsSetting[1]];
        previousDisplay.push(1);
        room.seatsSetting[1] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
    }
    function deleteBlockH() {
        const previousDisplay = [...room.seatsSetting[0]];
        previousDisplay.pop();
        room.seatsSetting[0] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
    }
    function deleteBlockV() {
        const previousDisplay = [...room.seatsSetting[1]];
        previousDisplay.pop();
        room.seatsSetting[1] = previousDisplay;
        setRoom(createRoom(room.seatsSetting));
    }
    
    function addSeatInColumn(i) {
        const newNumberofRowInBlock = room.seatsSetting[0][i] + 1;
        room.seatsSetting[0][i] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
        console.log(i);
        console.log(room.seatsSetting);
    }
    
    function addRowInBlock(i) {
        const newNumberofRowInBlock = room.seatsSetting[1][i] + 1;
        room.seatsSetting[1][i] = newNumberofRowInBlock;
        setRoom(createRoom(room.seatsSetting));
    }
    
    function createRoom(setting) {
        
        const numberSeatsInRow = setting[0].reduce(
            (total, current) => total + current,
            0
        );
        const numberSeatsInColumn = setting[1].reduce((t, c) => t + c, 0);

        let accumulator = 0;
        
        const realSeatIndex = setting[0].map((c, i) => {
            if (i === 0) {
                accumulator = c;
                return c;
            } else {
                accumulator += c;
                return accumulator;
            }
        });
        
        accumulator = 0;
        const vCorridorIndex = setting[1].map((c, i) => {
            if (i === 0) {
                accumulator = c;
                return c;
            } else {
                accumulator += c;
                return accumulator;
            }
        });
        function capacityCalculation() {
            const seatsByRow = setting[0].reduce((t, c) => t + c, 0);
            const seatsByColumns = setting[1].reduce((t, c) => t + c, 0);

            const entrancededuction =
                (setting[2][1] - setting[2][0] + 1) *
                (setting[2][3] - setting[2][2] + 1);

            const totalSeats = seatsByRow * seatsByColumns - entrancededuction;
            return totalSeats;
        }
        const roomCapacity = capacityCalculation();

        const seats = [];
        for (let rowIndex = 0; rowIndex < numberSeatsInColumn; rowIndex++) {
            const oneRow = Array.from(
                { length: numberSeatsInRow },
                (c, seatIndex) => {
                    const seatInit =
                        rowIndex >= setting[2][2] - 1 &&
                        rowIndex < setting[2][3] &&
                        seatIndex >= setting[2][0] - 1 &&
                        seatIndex < setting[2][1]
                            ? null
                            : false;
                    return seatInit;
                }
            );
            seats.push(oneRow);
        }
        const roomInfo = {
            seatsSetting: setting,
            hCorridorIndex: realSeatIndex,
            vCorridorIndex: vCorridorIndex,
            capacity: roomCapacity,
            seats: seats,
        };
        return roomInfo;
    }
    

    function handleClick(row, column) {
        room.seats[row][column] = true;
    }
    console.log(room)
    let verticalBlockIterator = 0;
    return (
        <>
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
                                    src='img/ordering/emptySeat.png'
                                    alt="blank space"
                                    className="roomMapSeat"
                                />
                            );
                        } else if (current === false) {
                            seatElement = (
                                <button
                                    key={i + ' ' + index * 1000}
                                    onClick={() => handleClick(i, index)}
                                    className="roomMap_btn"
                                >
                                    <img
                                        src='img/ordering/freeSeat.png'
                                        alt="place libre"
                                        className="roomMapSeat"
                                    />
                                </button>
                            );
                        } else {
                            seatElement = (
                                <img
                                    key={i + ' ' + index * 100}
                                    src='/img/ordering/takenSeat.png'
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
                                    <img
                                        src='img/ordering/emptySeat.png'
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
                                    src='img/ordering/emptySeat.png' 
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
                            </div>
                        );
                        
                        verticalBlockIterator++;
                        
                        return rowAndButton;
                    }else {
                        return <div key={i}>{seatRow}</div>;
                    }
                })}
            </div>
        </>
    );
}
export default RoomGenerator;
