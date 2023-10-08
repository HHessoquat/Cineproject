function RoomGenerator() {
    const room = createRoom([
        [4, 6, 4],
        [2, 2, 8],
        [0, 0, 0, 0],
    ]);
    
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
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    
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
        console.log(room);
    }

    let verticalBlockIterator = 0;

    return (
        <div className="App">
            {room.seats.map((c, i) => {
                let blockSeatIterator = 0;
                const seatImage = c.map((current, index) => {
                    let seatElement;

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
                                src='/img/ordering/freeSeat.png'
                                alt="place réservée"
                                className="roomMapSeat"
                            />
                        );
                    }
                    let seatAndCorridor;
                    if (room.hCorridorIndex[blockSeatIterator] === index) {
                        blockSeatIterator++;
                        seatAndCorridor = (
                            <span key={i + ' ' + index * 2}>
                                <img
                                    src='img/ordering/emptySeat.png'
                                    alt="corridor"
                                    className="roomMapSeat"
                                />
                                {seatElement}
                            </span>
                        );
                    } else {
                        seatAndCorridor = seatElement;
                    }

                    return seatAndCorridor;
                });
                const seatRow = (
                    <div>
                        <p>
                            {alphabet[i]} {seatImage}
                        </p>
                    </div>
                );
                let rowAndCorridor;
                if (i === room.vCorridorIndex[verticalBlockIterator]) {
                    rowAndCorridor = (
                        <div key={i}>
                            <img
                                src='img/ordering/emptySeat.png' 
                                alt="corridor"
                                className="roomMapSeat"
                            />
                            {seatRow}
                        </div>
                    );
                    verticalBlockIterator++;
                } else {
                    rowAndCorridor = <div key={i}>{seatRow}</div>;
                }
                return rowAndCorridor;
            })}
        </div>
    );
}
export default RoomGenerator;
