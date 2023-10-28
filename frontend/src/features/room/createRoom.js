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
export default createRoom;